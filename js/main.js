const encryptForm = document.querySelector("#encrypt-form");
const decryptForm = document.querySelector("#decrypt-form");
const encryptResultTag = document.querySelector("#encrypt-result");
const decryptResultTag = document.querySelector("#decrypt-result");
const alphabet = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

encryptForm.addEventListener("submit", (e) => {
    // Prevent default behviour of the form
    e.preventDefault();

    // Get the string
    const plainString = document.getElementById("encrypt").value;
    const encrytionLevel = parseInt(document.getElementById("level").value);

    // Check if it's harshad or not
    encrypt(plainString, encrytionLevel);
})

decryptForm.addEventListener("submit", (e) => {
    // Prevent default behviour of the form
    e.preventDefault();

    // Get the string
    const encryptedString = document.getElementById("decrypt").value;
    const encrytionLevel = parseInt(document.getElementById("level").value);

    // Check if it's harshad or not
    decrypt(encryptedString, encrytionLevel);
})

const encrypt = (plainString, encryptionLevel) => {
    if (encryptionLevel <= 0) {
        encryptResultTag.innerHTML = "Cannot perform an encryption with 0 or lower encryption level";
        encryptResultTag.className = "text-danger";
        return;
    }

    if (isNaN(encryptionLevel)) {
        encryptResultTag.innerHTML = "Cannot perform an encryption with a string as an encryption level";
        encryptResultTag.className = "text-danger";
        return;
    }

    if (!doesContainANumber(plainString)) {
        encryptResultTag.innerHTML = "Cannot perform an encryption with a string that contains a number";
        encryptResultTag.className = "text-danger";
        return;
    }

    const charArray = plainString.split("");
    let encryptedString = "";
    for (let index = 0; index < charArray.length; index++) {
        const character = charArray[index];
        if (character == " ") {
            encryptedString += " ";
            continue;
        }
        if (character == character.toUpperCase()) {
            encryptedString += getEncryptedCharacter(getAlphabetNum(character), encryptionLevel).toUpperCase();
            continue;
        }
        encryptedString += getEncryptedCharacter(getAlphabetNum(character), encryptionLevel)
    }

    encryptResultTag.innerHTML = `Encrypted String:${encryptedString}`;
    encryptResultTag.className = "text-success";

    return encryptedString;
}

const decrypt = (hashString, encryptionLevel) => {
    if (encryptionLevel <= 0) {
        decryptResultTag.innerHTML = "Cannot perform an encryption with 0 or lower encryption level";
        decryptResultTag.className = "text-danger";
    }

    if (isNaN(encryptionLevel)) {
        decryptResultTag.innerHTML = "Cannot perform a decryption with a string as an encryption level";
        decryptResultTag.className = "text-danger";
        return;
    }

    if (!doesContainANumber(hashString)) {
        decryptResultTag.innerHTML = "Cannot perform a decryption with a string that contains a number";
        decryptResultTag.className = "text-danger";
        return;
    }

    const charArray = hashString.split("");
    let decryptedString = "";
    for (let index = 0; index < charArray.length; index++) {
        const character = charArray[index];
        if (character == " ") {
            decryptedString += " ";
            continue;
        }
        if (character == character.toUpperCase()) {
            decryptedString += getDecryptedCharacter(getAlphabetNum(character), encryptionLevel).toUpperCase();
            continue;
        }
        decryptedString += getDecryptedCharacter(getAlphabetNum(character), encryptionLevel)
    }

    decryptResultTag.innerHTML = "Decrypted String: " + decryptedString;
    decryptResultTag.className = "text-success";

    return decryptedString;
}

const getAlphabetNum = (character) => {
    let returnedIndex = 0;
    alphabet.forEach((element, index) => {
        if (element.toLowerCase() == character.toLowerCase()) {
            returnedIndex = index;
        }
    })
    return returnedIndex;
}

const getEncryptedCharacter = (characterIndex, encryptionLevel) => {
    let diff = characterIndex + encryptionLevel;
    while (diff > 26) {
        diff -= 26;
    }
    return alphabet[diff];
}

const getDecryptedCharacter = (characterIndex, encryptionLevel) => {
    let diff = characterIndex - encryptionLevel;
    while (diff < 0) {
        diff += 26;
    }
    return alphabet[diff];
}

function doesContainANumber(string) {
    const charArray = string.split("");
    let tof = true;
    charArray.forEach(item => {
        if (!isNaN(item)){
            tof = false;
        }
    })
    return tof;
}