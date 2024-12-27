const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const uniqueId = Date.now();
const tempFilePath = path.join(__dirname, `temp_${uniqueId}.c`);
const tempExePath = path.join(__dirname, `temp_${uniqueId}.exe`);

const {executeCode} = require('./code.service/codeexe')


const app = express();
const PORT = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.post('/run', async(req, res) => {
    const { code, language } = req.body;

    const output = await executeCode(code, language);
    console.log("app.js: Output: ", output);
    
    if(output.output){
        res.send({output: output.output});
    }
    else if(output.err){
        res.send({error: output.err});
    }

    // Define file extensions and commands
    // const extensions = { c: '.c', java: '.java', python: '.py', javascript: '.js' };
    // const commands = {
    //     c: 'gcc temp.c -o temp.exe && temp.exe',
    //     java: 'javac Temp.java && java Temp',
    //     python: 'python3 temp.py',
    //     javascript: 'node temp.js'
    // };

    // const extension = extensions[language];
    // const command = commands[language];

    // if (!extension || !command) {
    //     return res.status(400).send('Unsupported language');
    // }

    // Create a temporary file
    // const filename = `temp${extension}`;
    // fs.writeFileSync(filename, code);

    // Execute the code
    // exec(command, (error, stdout, stderr) => {
    //     // Clean up
    //     fs.unlinkSync(filename);
    //     if (language === 'java') {
    //         fs.unlinkSync('Temp.class');
    //     }
    //     if (language === 'c' && fs.existsSync('temp.exe')) fs.unlinkSync('temp.exe');

    //     if (error) {
    //         return res.send({ error: stderr });
    //     }
    //     res.send({ output: stdout });
    // });
});

app.listen(PORT, () => {
    console.log(`Code Editor Server running at http://localhost:${PORT}`);
});
