const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    lineNumbers: true,
    mode: 'javascript', // Default mode
    theme: 'default',
});

document.getElementById('language').addEventListener('change', (e) => {
    const language = e.target.value;
    const modes = { c: 'text/x-csrc', java: 'text/x-java', python: 'python', javascript: 'javascript' };
    editor.setOption('mode', modes[language]);
});

document.getElementById('run').addEventListener('click', () => {
    const code = editor.getValue();
    const language = document.getElementById('language').value;

    fetch('http://localhost:5001/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
    })
        .then((res) => res.json())
        .then((data) => {
            document.getElementById('output').textContent = data.output || data.error;
        })
        .catch((err) => console.error('Error:', err));
});
