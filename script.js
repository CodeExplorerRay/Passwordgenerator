document.addEventListener("DOMContentLoaded", function() {
    const lengthSlider = document.getElementById("password-length");
    const lengthLabel = document.getElementById("password-length-label");
    const passwordDisplay = document.getElementById("generated-password");

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

    // Initial password generation
    generatePassword();
});