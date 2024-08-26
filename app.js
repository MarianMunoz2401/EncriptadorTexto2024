// app.js

function convertToLowercase(text) {
    return text.toLowerCase();
}

function validateInput(text) {
    const pattern = /^[a-z ]+$/;
    return pattern.test(text);
}

function encrypt(text) {
    text = convertToLowercase(text);

    if (!validateInput(text)) {
        return "Error: El texto contiene caracteres no permitidos. Solo letras minúsculas y espacios son válidos.";
    }

    const vocales = { "a": "ai", "e": "enter", "i": "imes", "o": "ober", "u": "ufat" };

    return text.replace(/[aeiou]/g, match => vocales[match]);
}

function decrypt(text) {
    text = convertToLowercase(text);

    if (!validateInput(text)) {
        return "Error: El texto contiene caracteres no permitidos. Solo letras minúsculas y espacios son válidos.";
    }

    const vocalesInvertidas = { "ai": "a", "enter": "e", "imes": "i", "ober": "o", "ufat": "u" };

    return text.replace(/ai|enter|imes|ober|ufat/g, match => vocalesInvertidas[match]);
}

function showCopyMessage() {
    const copyMessage = document.createElement("div");
    copyMessage.textContent = "Texto copiado al portapapeles";
    copyMessage.style.position = "fixed";
    copyMessage.style.bottom = "20px";
    copyMessage.style.right = "20px";
    copyMessage.style.padding = "10px";
    copyMessage.style.backgroundColor = "#4CAF50";
    copyMessage.style.color = "white";
    copyMessage.style.borderRadius = "5px";
    copyMessage.style.zIndex = "1000";
    document.body.appendChild(copyMessage);

    setTimeout(() => {
        document.body.removeChild(copyMessage);
    }, 3000);
}

document.getElementById("copyBtn").addEventListener("click", function() {
    const outputText = document.getElementById("txtInfo").value;
    navigator.clipboard.writeText(outputText).then(() => {
        showCopyMessage();
    }).catch(err => {
        console.error("Error al copiar el texto", err);
    });
});

function handleTextConversion(conversionFunction) {
    const inputText = document.getElementById("inputText").value;
    const outputText = conversionFunction(inputText);
    document.getElementById("txtInfo").value = outputText;

    if (outputText) {
        document.getElementById("mensajeAdv").classList.add("hide");
        document.getElementById("imgDer").classList.add("hide");
        document.getElementById("txtInfo").classList.add("ajustar");
        document.getElementById("copyBtn").classList.remove("hide");
    }
}


document.getElementById("encryptBtn").addEventListener("click", function() {
    handleTextConversion(encrypt);
});

document.getElementById("decryptBtn").addEventListener("click", function() {
    handleTextConversion(decrypt);
});
