export default function handler(req, res) {
    const { id, lop } = req.query;

    // التحقق من أن `id` و `lop` قد تم تمريرهما في الرابط
    if (!id || !lop) {
        return res.status(400).send("Both 'id' and 'lop' parameters are required");
    }

    // Function to convert hex to text
    function hexToText(hexString) {
        let hex = hexString.toString();
        let str = '';
        for (let i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return str;
    }

    // Function to generate the response text
    function generateResponse(id, lop) {
        const phones = ["iPhone", "Samsung", "redmi", "OnePlus", "Sony", "Huawei"];
        const phone = phones[Math.floor(Math.random() * phones.length)];
        const longText = hexToText(lop);

        let shortUrl;
        let nor;

        if (longText.includes('google')) {
            shortUrl = longText.split('https')[1]?.split('')[0];
            nor = "Google";
        } else if (longText.includes('facebook')) {
            shortUrl = longText.split('https')[1]?.split('')[0];
            nor = "Facebook";
        } else {
            shortUrl = "No link found";
            nor = "Unknown";
        }

        // Ensure the URL starts with 'https://'
        if (!shortUrl.startsWith('https://')) {
            shortUrl = 'https://' + shortUrl;
        }

        return `[b][c]~ المحاكمة:\n[00ffff]إيدي لاعب: ${id}\nهاتف لاعب: ${phone}\nربط اساسي: ${nor}\nصورة لاعب: [00ff00]${shortUrl}`;
    }

    // بناء النص النهائي
    const responseText = generateResponse(id, lop);

    // إرجاع النص كاستجابة مباشرة
    res.status(200).send(responseText);
            }
