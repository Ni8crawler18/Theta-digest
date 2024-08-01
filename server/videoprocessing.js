const axios = require('axios');

async function processVideo(link) {
    // Placeholder function for video processing
    const response = await axios.get(link);
    const text = response.data; // Assume the link returns video text
    return text;
}

module.exports = { processVideo };
