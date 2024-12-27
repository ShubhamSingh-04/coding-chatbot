let conversation_history = [];

const formatConversationHistory = (item)=>{
    if(item.role !== 'attachment'){
        return {
            role: (item.role === 'user')?"user":"model",
            parts: [{ text: `${item.content}\n` }],
          }
    }

    else if(item.attachment.attachmentType === 'github'){
        return{
            role:"user",
            parts:[{text:
                `GitHub Attachment- ${item.attachment.attachmentName}:\n${item.attachment.attachmentContent[0]}\n` 
            }]
        };
    }
   
}

const push_conversation_history = async(item)=>{
    const formatted_item = formatConversationHistory(item);
    conversation_history.push(formatted_item);

}

const set_conversation_history_empty = async()=>{
    conversation_history.length = 0;
}

const get_conversation_history = ()=>{
    return [...conversation_history];   // Returns a shallow copy
}

module.exports = {
    push_conversation_history,
    set_conversation_history_empty,
    get_conversation_history
}