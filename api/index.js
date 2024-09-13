// index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Helper function to convert hex to text
function hexToText(hexString) {
    let hex = hexString.toString();
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

app.get('/api', (req, res) => {
    const { lop, id } = req.query;

    if (!lop || !id) {
        return res.status(400).json({ error: "Both 'lop' and 'id' parameters are required" });
    }

    const phones = ["iPhone", "Samsung", "redmi", "OnePlus", "Sony", "Huawei"];
    const phone = phones[Math.floor(Math.random() * phones.length)];
    const longText = hexToText(lop);

    let result = "No relevant links found.";

    if (longText.includes('google')) {
        const link = longText.substring(longText.indexOf('https'), longText.indexOf(''));
        result = `[b][c]~ المحاكمة:\n[00ffff]إيدي لاعب: ${id}\nهاتف لاعب: ${phone}\nربط اساسي: Google\nصورة لاعب: [00ff00]${link}`;
    } else if (longText.includes('facebook')) {
        const link = longText.substring(longText.indexOf('https'), longText.indexOf(''));
        result = `[b][c]~ المحاكمة:\n[00ffff]إيدي لاعب: ${id}\nهاتف لاعب: ${phone}\nربط اساسي: Facebook\nصورة لاعب: [00ff00]${link}`;
    }

    res.status(200).json({ result });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
