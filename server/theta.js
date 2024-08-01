const axios = require('axios');

const THETA_API_URL = 'https://api.thetatoken.org/v1'; // Replace with the actual Theta API URL
const THETA_API_KEY = 'your_theta_api_key'; // Replace with your actual Theta API key

// Function to upload a video to Theta
async function uploadVideoToTheta(videoFilePath) {
    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(videoFilePath));

        const response = await axios.post(`${THETA_API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${THETA_API_KEY}`,
            },
        });

        console.log('Video upload result:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading video to Theta:', error);
        return 'Error uploading video to Theta';
    }
}

// Function to get the status of a video stream on Theta
async function getThetaStreamStatus(videoId) {
    try {
        const response = await axios.get(`${THETA_API_URL}/streams/${videoId}`, {
            headers: {
                'Authorization': `Bearer ${THETA_API_KEY}`,
            },
        });

        console.log('Stream status result:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting stream status from Theta:', error);
        return 'Error getting stream status from Theta';
    }
}

// Endpoint to upload a video and get its status
app.post('/theta/upload', async (req, res) => {
    const { videoFilePath } = req.body; // Path to the video file

    // Upload the video to Theta
    const uploadResult = await uploadVideoToTheta(videoFilePath);
    if (uploadResult.error) {
        return res.status(500).json({ error: uploadResult.error });
    }

    // Get the status of the uploaded video stream
    const streamStatus = await getThetaStreamStatus(uploadResult.videoId);
    res.json({ uploadResult, streamStatus });
});
