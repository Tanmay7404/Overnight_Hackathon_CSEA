const fetch=require('node-fetch')

async function fetchTextData(url) {
    const response = await fetch(url);
    const textData = await response.text();
    console.log(textData);
    return textData;
}

module.exports = fetchTextData;