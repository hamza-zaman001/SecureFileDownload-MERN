import React from "react";
import axios from "axios";

const DownloadButton = () => {
    const API_URL = "https://localhost:5000";

    const handleDownload = async () => {
        try {
            // Make a GET request to the backend's /download endpoint
            const response = await axios.get(`${API_URL}/download`, {
                responseType: "text", // Ensure the response is treated as a string
            });

            // Encrypted content from backend (Base64 encoded)
            const encryptedContent = response.data;

            // Decode the Base64 content to get the original data
            const decryptedContent = atob(encryptedContent); // atob() decodes Base64

            console.log("Decrypted content:", decryptedContent);

            // Create a blob URL for the decrypted file
            const blob = new Blob([decryptedContent], { type: "text/plain" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;

            // Set the file name for the downloaded file
            link.setAttribute("download", "decryptedFile.txt");
            document.body.appendChild(link);

            // Simulate a click on the link to trigger the download
            link.click();

            // Clean up the link element
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading the file:", error);
            alert("Failed to download the file. Please check the console for more details.");
        }
    };

    return (
        <div>
            <button onClick={handleDownload} style={styles.button}>
                Download
            </button>
        </div>
    );
};

// Optional inline styles for the button
const styles = {
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
    },
};

export default DownloadButton;
