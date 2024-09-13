const axios = require('axios');

async function shortenUrl(longUrl) {
    const apiUrl = 'https://cleanuri.com/api/v1/shorten';
    try {
        const response = await axios.post(apiUrl, new URLSearchParams({ url: longUrl }));
        return response.data.result_url;
    } catch (error) {
        console.error('Error shortening URL:', error);
        return null;
    }
}

function dec(hexString) {
    return Buffer.from(hexString, 'hex').toString('latin1');
}

async function info(lop) {
    const phones = ["iPhone", "Samsung", "redmi", "OnePlus", "Sony", "Huawei"];
    const phone = phones[Math.floor(Math.random() * phones.length)];
    const longText = dec(lop);
    const id = "في فريق";

    if (longText.includes('google')) {
        const link = extractLink(longText);
        const shortUrl = await shortenUrl(link);
        const nor = "Google";
        console.log(`[b][c]~ المحاكمة:\n[00ffff]حالة لاعب: ${id}\nهاتف لاعب: ${phone}\nربط اساسي: ${nor}\nصورة لاعب: [00ff00]${shortUrl}`);
    }

    if (longText.includes('facebook')) {
        const link = extractLink(longText);
        const shortUrl = await shortenUrl(link);
        const nor = "Facebook";
        console.log(`[b][c]~ المحاكمة:\n[00ffff]حالة لاعب: ${id}\nهاتف لاعب: ${phone}\nربط اساسي: ${nor}\nصورة لاعب: [00ff00]${shortUrl}`);
    }
}

function extractLink(text) {
    const ap = 'https';
    const dp = '';
    const startLink = text.indexOf(ap);
    const endLink = text.indexOf(dp, startLink);
    return text.substring(startLink, endLink);
}

// Replace 'lop' with your actual hex string input
const lop = 'your_hex_string_here';
info(lop);
