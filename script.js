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
    const strength = testPasswordStrength(password);
    updateStrengthIndicator(strength);
}

function testPasswordStrength(value) {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=/\()%ยง!@#$%^&*])(?=.{8,})/;
    const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

    if (strongRegex.test(value)) {
        return "strong";
    } else if (mediumRegex.test(value)) {
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

// Remaining code from the new password strength validator
$(document).ready(function() {
    // hide/show password
    $(".icon-wrapper").click(function() {
        $(".toggle-password").toggleClass(".ion-eye ion-more");
        var input = $($(".toggle-password").attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    // strength validation on keyup-event
    $("#password-field").on("keyup", function() {
        var val = $(this).val(),
            color = testPasswordStrength(val);

        styleStrengthLine(color, val);
    });

    // Remaining functions from the new password strength validator
    function styleStrengthLine(color, value) {
        $(".line")
            .removeClass("bg-red bg-orange bg-green")
            .addClass("bg-transparent");
        
        if (value) {
            
            if (color === "red") {
                $(".line:nth-child(1)")
                    .removeClass("bg-transparent")
                    .addClass("bg-red");
            } else if (color === "orange") {
                $(".line:not(:last-of-type)")
                    .removeClass("bg-transparent")
                    .addClass("bg-orange");
            } else if (color === "green") {
                $(".line")
                    .removeClass("bg-transparent")
                    .addClass("bg-green");
            }
        }
    }
});

generatePassword(); // Initial password generation
