const lengthSlider = document.getElementById("password-length");
const lengthLabel = document.getElementById("password-length-label");
const passwordDisplay = document.getElementById("generated-password");
const strengthIndicator = document.getElementById("strength-indicator");

lengthSlider.addEventListener("input", () => {
    lengthLabel.textContent = `Password Length: ${lengthSlider.value}`;
    generatePassword();
});

function generatePassword() {
    const passwordLength = lengthSlider.value;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    let password = "";

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }

    passwordDisplay.textContent = password;
    evaluatePasswordStrength(password);
}

function evaluatePasswordStrength(password) {
    const strength = calculatePasswordStrength(password);
    updateStrengthIndicator(strength);
}

function calculatePasswordStrength(password) {
    if (password.length >= 13 && password.length <= 64) {
        return "strong";
    } else if (password.length >= 8 && password.length <= 12) {
        return "medium";
    } else {
        return "weak";
    }
}

function updateStrengthIndicator(strength) {
    strengthIndicator.className = strength;
    strengthIndicator.style.width = "100%";
    if (strength === "weak") {
        strengthIndicator.style.width = `${(password.length / 8) * 100}%`;
    } else if (strength === "medium") {
        strengthIndicator.style.width = `${((password.length - 8) / 5) * 100}%`;
    }
}

function copyPassword() {
    const passwordText = passwordDisplay.textContent;
    const textarea = document.createElement('textarea');
    textarea.value = passwordText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Password copied to clipboard!');
}

generatePassword();
