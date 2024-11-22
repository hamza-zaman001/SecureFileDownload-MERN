const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { encryptFile } = require("./fileUtils"); // Import the updated fileUtils.js

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// SSL certificates for HTTPS
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, "ssl", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "ssl", "cert.pem")),
};

// /download endpoint
app.get("/download", (req, res) => {
    try {
        console.log("Received request for /download");

        // Path to the original file
        const filePath = path.join(__dirname, "originalFile.txt");

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            console.error("File not found:", filePath);
            return res.status(404).send("File not found.");
        }

        // Read the file content
        const fileContent = fs.readFileSync(filePath, "utf8");
        console.log("Original file content:", fileContent);

        // Encrypt the file content (Base64 encoding)
        const encryptedData = encryptFile(fileContent);
        console.log("Encrypted data:", encryptedData);

        // Send the encrypted data as the response
        res.status(200).send(encryptedData);
    } catch (err) {
        console.error("Error in /download endpoint:", err);
        res.status(500).send("Internal server error.");
    }
});

// Start HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Secure server running at https://localhost:${PORT}`);
});
