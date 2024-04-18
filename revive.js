const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;

// Endpoint to retrieve all .txt files in a folder
app.get('/list_txt_files', (req, res) => {
    try {
        // Specify the folder path where you want to search for .txt files
        const folderPath = __dirname;

        // Read all files in the specified folder
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error('Error reading folder:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            // Filter out only .txt files
            const txtFiles = files.filter(file => path.extname(file).toLowerCase() === '.txt');

            // Send back the list of .txt file names
            res.status(200).json({ txtFiles });
        });
    } catch (err) {
        console.error('Error retrieving .txt files:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
