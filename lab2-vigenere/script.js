const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

//генерируем ключ шифрования
function generateKey() {
    const length = Math.floor(Math.random() * 10) + 5; // Длина ключа от 5 до 15
    const key = Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
    document.getElementById('keyInput').value = key;
}

//шифровка
function encrypt() {
    const inputText = document.getElementById('inputText').value.toUpperCase();
    const key = document.getElementById('keyInput').value.toUpperCase();

    if (!key) {
        alert('Введите или сгенерируйте ключ!');
        return;
    }

    const encryptedText = processVigenere(inputText, key, true);
    document.getElementById('resultText').innerText = 'Зашифрованный текст: ' + encryptedText;
}

//расшифровка
function decrypt() {
    const inputText = document.getElementById('inputText').value.toUpperCase();
    const key = document.getElementById('keyInput').value.toUpperCase();

    if (!key) {
        alert('Введите или сгенерируйте ключ!');
        return;
    }

    const decryptedText = processVigenere(inputText, key, false);
    document.getElementById('resultText').innerText = 'Расшифрованный текст: ' + decryptedText;
}

//виженер
function processVigenere(text, key, isEncrypt) {
    let result = '';
    let keyIndex = 0;

    for (const char of text) {
        const textIndex = alphabet.indexOf(char);

        if (textIndex === -1) {
            result += char;
            continue;
        }

        const keyIndexValue = alphabet.indexOf(key[keyIndex % key.length]);
        const newIndex = isEncrypt
            ? (textIndex + keyIndexValue) % alphabet.length
            : (textIndex - keyIndexValue + alphabet.length) % alphabet.length;

        result += alphabet[newIndex];
        keyIndex++;
    }

    return result;
}
