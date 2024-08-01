const express = require('express');
const bodyParser = require('body-parser');
const { processVideo } = require('./videoProcessing');
const { summarizeText } = require('./summarization');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/summarize', async (req, res) => {
    const { link } = req.body;
    const text = await processVideo(link);
    const summary = await summarizeText(text);
    res.json({ summary });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
