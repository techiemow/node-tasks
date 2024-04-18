const express = require('express');
const fs = require('fs');
const path = require('path');
const { DateTime } = require('luxon'); // Using luxon for date/time formatting

const app = express();
const port = 3000;

app.get('/create_file', (req, res) => {
    try {
        // Specify the folder where you want to save the file
        const folderPath = __dirname;

        // Generate the current timestamp
        const currentTime = DateTime.now().toFormat('yyyy-MM-dd-HH-mm-ss');

        // Construct the filename
        const filename = `${currentTime}.txt`;

        // Full path of the file
        const filePath = path.join(folderPath, filename);

        // Content to be written in the file
        const fileContent = `Current timestamp: ${currentTime}`;

        // Write content to the file
        fs.writeFileSync(filePath, fileContent);

        res.status(200).json({ message: 'File created successfully', filePath });
    } catch (err) {
        console.error('Error creating file:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
