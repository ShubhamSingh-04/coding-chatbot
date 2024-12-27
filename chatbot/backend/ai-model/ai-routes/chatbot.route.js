const express = require('express');
const router = express.Router();

const {saveMessage, saveAttachment} = require('../../database/db-services/message.service');
const {push_conversation_history} = require('../ai-services/conversation-history.cjs');

const run = require('../ai-services/gemini.cjs');

router.post('/', async (req, res)=>{
    const {conversationID, sentMessage} = req.body;
    const saved_message = await saveMessage('user', conversationID, sentMessage);
    await push_conversation_history(saved_message); //save message to model conversation history
    
    try{
        const response  = await run(sentMessage);
        res.status(200).json({"message": response});
        const saved_message  = await saveMessage('bot', conversationID, response);
        await push_conversation_history(saved_message);
    } catch(error){
        console.error("Error at .post chatbot.route.js:", error);
    }    
});

router.post('/attachment', async(req, res)=>{
    const {conversationID, attachment} = req.body;

    try{
        if(attachment.type === 'github'){
            const attachGitHubModule = await import('../attachment-services/github.service.mjs');
            const { attachGitHub } = attachGitHubModule;

            if (!attachGitHub) {
                throw new Error('GitHub attachment handler not found.');
            }

            const gitAttachment = await attachGitHub(attachment.gitURL);
    
            const attachmentInfo = {
                    attachmentType:'github',
                    attachmentName: `File from ${gitAttachment.owner}'s "${gitAttachment.repo}" repository`,
                    attachmentContent: [gitAttachment.fileContent]
            }

            const saved_attachment = await saveAttachment(conversationID, attachmentInfo);
            await push_conversation_history(saved_attachment);

            const response = await run(`THIS IS A CODE FROM GITHUB: Remember the GitHub Attachment I have a few questions regarding this. Do not explain the code now: ${attachmentInfo.attachmentName}:\n ${attachmentInfo.attachmentContent[0]}`);
            const saved_message  = await saveMessage('bot', conversationID, response);
            await push_conversation_history(saved_message);

            res.status(201).json({attachmentInfo, response});
        }
    } catch(error){
        console.log("Error at chatbot.route.js:", error);
        res.status(400).json({error:"Invalid Attachment:"});
    }
})

module.exports = router;