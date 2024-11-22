function encryptFile(data) {
    // Base64 encode the data
    return Buffer.from(data, "utf8").toString("base64");
}

function decryptFile(data) {
    // Base64 decode the data
    return Buffer.from(data, "base64").toString("utf8");
}

module.exports = { encryptFile, decryptFile };
