const { pipeline } = require('transformers');

async function summarizeText(text) {
    const summarizer = pipeline('summarization', 'sshleifer/distilbart-cnn-12-6');
    const summary = await summarizer(text, { max_length: 150, min_length: 30, do_sample: false });
    return summary[0].summary_text;
}

module.exports = { summarizeText };
