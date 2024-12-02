const express = require('express');
const router = express.Router();

const run = require('../gemini.cjs');

router.post('/', async (req, res)=>{
    const {sentMessage} = req.body;

    try{
        const response  = await run(sentMessage);
        res.status(200).json({"message": response});
    } catch(error){
        console.error("Error at .get chatbotRoute:", error);
    }
})

module.exports = router;