import fetch from 'node-fetch';

// Function to shorten URL
async function shortenUrl(longUrl) {
    const apiUrl = 'https://cleanuri.com/api/v1/shorten';
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ url: longUrl })
    });
    if (response.ok) {
        const data = await response.json();
        return data.result_url;
    } else {
        return null;
    }
}

// Function to decode hex to text
function dec(hexString) {
    return Buffer.from(hexString, 'hex').toString('latin1');
}

// API handler
export default async function handler(req, res) {
    const { lop } = req.query;

    if (!lop) {
        return res.status(400).send("The 'lop' parameter is required");
    }

    // Define phone options
    const phones = ["iPhone", "Samsung", "redmi", "OnePlus", "Sony", "Huawei"];
    const phone = phones[Math.floor(Math.random() * phones.length)];

    // Decode the provided hex string
    const longText = dec(lop);

    let responseText = "";

    if (longText.includes('google')) {
        const link = extractLink(longText);
        const shortUrl = await shortenUrl(link);
        responseText = `[b][c]~ المحاكمة:\n[00ffff]حالة لاعب: في فريق\nهاتف لاعب: ${phone}\nربط اساسي: Google\nصورة لاعب: [00ff00]${shortUrl}`;
    } else if (longText.includes('facebook')) {
        const link = extractLink(longText);
        const shortUrl = await shortenUrl(link);
        responseText = `[b][c]~ المحاكمة:\n[00ffff]حالة لاعب: في فريق\nهاتف لاعب: ${phone}\nربط اساسي: Facebook\nصورة لاعب: [00ff00]${shortUrl}`;
    } else {
        responseText = "[b][c]~ المحاكمة:\n[00ffff]حالة لاعب: في فريق\nهاتف لاعب: ${phone}\nربط اساسي: Unknown\nصورة لاعب: [00ff00]No link found";
    }

    res.status(200).send(responseText);
}

// Extract link from long text
function extractLink(longText) {
    const ap = 'https';
    const dp = '';
    const startLink = longText.indexOf(ap);
    const endLink = longText.indexOf(dp, startLink);
    return longText.substring(startLink, endLink);
    }
