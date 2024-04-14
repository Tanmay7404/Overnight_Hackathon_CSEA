const fetch=require('node-fetch')

async function fetchTextData(url) {
    const response = await fetch(url);
    const textData = await response.text();
    return textData;
}

function compareStrings(str1, str2) {
    // Remove all spaces and newlines from both strings
    const strippedStr1 = str1.replace(/\s/g, '');
    const strippedStr2 = str2.replace(/\s/g, '');

    // Compare the stripped strings
    return strippedStr1 === strippedStr2;
}

module.exports = {fetchTextData,compareStrings};