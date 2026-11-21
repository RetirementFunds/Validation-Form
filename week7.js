const fields = [
    { input: "first-name", label: "first-name-label", error: "fn-error" },
    { input: "last-name", label: "last-name-label", error: "ln-error" },
    { input: "email", label: "email-label", error: "email-error" },
    { input: "confirm-email", label: "confirm-email-label", error: "confirm-email-error" },
    { input: "phone", label: "phone-label", error: "phone-error" }
];

const isEmpty = (value) => /^\s*$/.test(value);
const form = document.forms.info;

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let hasInvalidField = false;

    fields.forEach(({ input, label, error }) => {
        const inputElement = document.getElementById(input);
        const labelElement = document.getElementById(label);
        const errorElement = document.getElementById(error);
        const empty = isEmpty(inputElement.value);
        const invalidName = (input === "first-name" || input === "last-name")
            && /[^\p{L}\s-]/u.test(inputElement.value);
        const invalidPhone = input === "phone"
            && inputElement.value.replace(/\D/g, "").length !== 10;
        const invalidEmailConfirmation = input === "confirm-email"
            && inputElement.value !== document.getElementById("email").value;
        const invalid = empty || invalidName || invalidPhone || invalidEmailConfirmation;
        let errorMessage = "";

        if (empty) {
            errorMessage = input === "first-name" || input === "last-name"
                ? "Please input a name"
                : input === "confirm-email"
                    ? "Please confirm your email"
                    : `Please input ${input === "phone" ? "a phone number" : "an email"}`;
        } else if (invalidName) {
            errorMessage = "Your name must not include special characters.";
        } else if (invalidPhone) {
            errorMessage = "Please enter a 10-digit phone number.";
        } else if (invalidEmailConfirmation) {
            errorMessage = "Email addresses do not match.";
        }

        labelElement.classList.toggle("error", invalid);
        errorElement.textContent = invalid ? `* ${errorMessage}` : "";
        errorElement.classList.toggle("error", invalid);
        inputElement.setAttribute("aria-invalid", String(invalid));
        hasInvalidField = hasInvalidField || invalid;
    });

    if (hasInvalidField) {
        return;
    }

    const person = {
        fname: document.getElementById("first-name").value,
        lname: document.getElementById("last-name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value.replace(/\D/g, "")
    };
    person.phone = `${person.phone.slice(0, 3)}-${person.phone.slice(3, 6)}-${person.phone.slice(6)}`;

    document.getElementById("info").textContent =
        `${person.fname} ${person.lname}\n${person.email}\n${person.phone}`;
    document.getElementById("form").style.display = "none";
    document.getElementById("confirmation").style.display = "block";
});