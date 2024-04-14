function countWordFrequency(document) {
    // Split the document into words
    const words = document.split(/\s+/);

    // Initialize an object to store word frequencies
    const wordFrequencyMap = {};

    // Count the frequency of each word
    for (const word of words) {
        // Convert the word to lowercase to ensure case-insensitive matching
        const normalizedWord = word.toLowerCase();
        
        // Increment the frequency count for the word
        wordFrequencyMap[normalizedWord] = (wordFrequencyMap[normalizedWord] || 0) + 1;
    }

    // Return the word frequency map
    return wordFrequencyMap;
}

function compareWordFrequencyMaps(doc1, doc2) {
    // Count word frequencies for both documents
    const wordFrequencyMap1 = countWordFrequency(doc1);
    const wordFrequencyMap2 = countWordFrequency(doc2);

    // Count the number of words with the same frequency in both documents
    let sameFrequencyCount = 0;
    for (const word in wordFrequencyMap1) {
        if (wordFrequencyMap2.hasOwnProperty(word) && wordFrequencyMap1[word] === wordFrequencyMap2[word]) {
            sameFrequencyCount++;
        }
    }

    // Calculate the percentage of words with the same frequency
    const totalWords = Object.keys(wordFrequencyMap1).length; 

    // Assuming both documents have the same number of unique words
    const percentageSameFrequency = (sameFrequencyCount / totalWords) * 100;
    console.log(percentageSameFrequency)

    // Return the percentage
    return percentageSameFrequency;
}
// Function to create a regular expression pattern for a sentence
function patternCreate(sentence) {
    let pattern = "";
    let words = sentence.split(/\s+/);

    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let firstChar = word.charAt(0);
        pattern += "[" + firstChar + "]\\w+";

        if (i !== words.length - 1) {
            pattern += "\\s";
        }
    }

    return pattern;
}


// Function to remove whitespace characters and comments for C/C++
function removeWhitespaceAndCommentsCPP(code) {
    // Remove single-line and multi-line comments and trailing whitespace
    return code.replace(/\/\/.*$|\/\*[\s\S]*?\*\//gm, '').replace(/\s+/g, '');
}

// Function to remove whitespace characters and comments for Dart
function removeWhitespaceAndCommentsDart(code) {
    // Remove single-line comments (//) and trailing whitespace
    return code.replace(/\/\/.*$/gm, '').replace(/\s+/g, '');
}

// Function to remove whitespace characters and comments for SQL
function removeWhitespaceAndCommentsSQL(code) {
    // Remove single-line and multi-line comments and trailing whitespace
    return code.replace(/--.*$|\/\*[\s\S]*?\*\//gm, '').replace(/\s+/g, '');
}

// Function to remove whitespace characters and comments for C
function removeWhitespaceAndCommentsC(code) {
    // Remove single-line and multi-line comments and trailing whitespace
    return code.replace(/\/\/.*$|\/\*[\s\S]*?\*\//gm, '').replace(/\s+/g, '');
}

// Function to remove whitespace characters and comments for Python
function removeWhitespaceAndCommentsPython(code) {
    // Remove comments starting with # and trailing whitespace
    return code.replace(/#.*$/gm, '').replace(/\s+/g, '');
}

// Function to normalize identifiers for Python
function normalizeIdentifiersPython(code) {
    // Replace variable names and function names with placeholders
    return code.replace(/[a-zA-Z_][a-zA-Z0-9_]*/g, 'var').replace(/\bdef\b/g, 'func');
}

// Function to normalize identifiers for C/C++
function normalizeIdentifiersCPP(code) {
    // Replace variable names, function names, and type names with placeholders
    return code.replace(/[a-zA-Z_][a-zA-Z0-9_]*/g, 'var').replace(/\bint\b|\bfloat\b|\bdouble\b|\bchar\b|\bvoid\b/g, 'type');
}

// Function to normalize identifiers for Dart
function normalizeIdentifiersDart(code) {
    // Replace identifiers with placeholders
    return code.replace(/[a-zA-Z_][a-zA-Z0-9_]*/g, 'var');
}

// Function to normalize identifiers for SQL
function normalizeIdentifiersSQL(code) {
    // Replace identifiers with placeholders
    return code.replace(/[a-zA-Z_][a-zA-Z0-9_]*/g, 'var').replace(/\bSELECT\b|\bFROM\b|\bWHERE\b|\bJOIN\b|\bLEFT\b|\bRIGHT\b|\bINNER\b/g, 'keyword');
}

// Function to normalize identifiers for JavaScript
function normalizeIdentifiersJavaScript(code) {
    // Replace variable names, function names, and object properties with placeholders
    return code.replace(/[a-zA-Z_][a-zA-Z0-9_]*/g, 'var').replace(/\bfunction\b|\bif\b|\belse\b|\bfor\b|\bwhile\b|\breturn\b/g, 'keyword');
}

// Function to concatenate lines into a single string
function concatenateLines(code) {
    // Split code into lines and join them into a single string
    return code.split('\n').join('');
}

// Function to extract hash values from each line
function getHashValues(code) {
    // For simplicity, use a basic hash function
    return code.split('').map(char => char.charCodeAt(0)).join('');
}


function normalizeIdentifiers(language, code) {
    switch (language) {
        case 'cpp' | 'c':
        
            return normalizeIdentifiersCPP(code);
        case 'dart':
            return normalizeIdentifiersDart(code);
        case 'sql':
            return normalizeIdentifiersSQL(code);
        case 'javascript':
            return normalizeIdentifiersJavaScript(code);
        case 'python':
            return normalizeIdentifiersPython(code);
             case 'php':
             return   normalizeIdentifiersPHP(code);
            
        break
        default:
            throw new Error('Unsupported language');
    }
}
// Function to normalize identifiers for PHP
function normalizeIdentifiersPHP(code) {
    // Replace variable names, function names, and identifiers with placeholders
    return code.replace(/\$[a-zA-Z_][a-zA-Z0-9_]*/g, '$var')
               .replace(/\bfunction\b/g, 'func')
               .replace(/\bclass\b/g, 'cls')
               .replace(/\bif\b|\belse\b|\belseif\b|\bendif\b|\bswitch\b|\bcase\b|\bdefault\b|\bbreak\b|\bwhile\b|\bdo\b|\bfor\b|\bforeach\b|\bcontinue\b|\breturn\b|\btry\b|\bcatch\b/g, 'keyword');
}


function removeWhitespaceAndCommentsPHP(code) {
    // Remove single-line comments (//) and trailing whitespace
    return code.replace(/\/\/.*$/gm, '').replace(/\s+/g, '');
}
// Baker's Dup technique implementation
function bakersDup(code1, code2, language) {
    let cleanedCode1, cleanedCode2;

    // Remove whitespace characters and comments based on the language
    if (language === 'cpp') {
        cleanedCode1 = removeWhitespaceAndCommentsCPP(code1);
        cleanedCode2 = removeWhitespaceAndCommentsCPP(code2);
    } else if (language === 'dart') {
        cleanedCode1 = removeWhitespaceAndCommentsDart(code1);
        cleanedCode2 = removeWhitespaceAndCommentsDart(code2);
    } else if (language === 'sql') {
        cleanedCode1 = removeWhitespaceAndCommentsSQL(code1);
        cleanedCode2 = removeWhitespaceAndCommentsSQL(code2);
    } else if (language === 'c') {
        cleanedCode1 = removeWhitespaceAndCommentsC(code1);
        cleanedCode2 = removeWhitespaceAndCommentsC(code2);
    } else if (language === 'python') {
        cleanedCode1 = removeWhitespaceAndCommentsPython(code1);
        cleanedCode2 = removeWhitespaceAndCommentsPython(code2);
    }
    else if (language === 'php') {
        cleanedCode1 = removeWhitespaceAndCommentsPHP(code1);
        cleanedCode2 = removeWhitespaceAndCommentsPHP(code2);
    } else {
        throw new Error('Unsupported language');
    }

    // Normalize identifiers for Python
    if (language === 'python') {
        const normalizedCode1 = normalizeIdentifiersPython(cleanedCode1);
        const normalizedCode2 = normalizeIdentifiersPython(cleanedCode2);
        cleanedCode1 = normalizedCode1;
        cleanedCode2 = normalizedCode2;
    }
    if (language !== 'python') {
        const normalizedCode1 = normalizeIdentifiers(language, cleanedCode1);
        const normalizedCode2 = normalizeIdentifiers(language, cleanedCode2);
        cleanedCode1 = normalizedCode1;
        cleanedCode2 = normalizedCode2;
    }
    
    // Concatenate lines into a single string
    const concatenatedCode1 = concatenateLines(cleanedCode1);
    const concatenatedCode2 = concatenateLines(cleanedCode2);

    // Extract hash values from each line
    const hashValues1 = getHashValues(concatenatedCode1);
    const hashValues2 = getHashValues(concatenatedCode2);

    // Compare hash values directly for simplicity
    return hashValues1 === hashValues2;
}



module.exports = {compareWordFrequencyMaps,bakersDup};