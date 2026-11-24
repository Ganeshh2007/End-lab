const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

function showLogin() {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    clearMessages();
}

function showRegister() {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    clearMessages();
}

function clearMessages() {
    document.getElementById("loginMessage").textContent = "";
    document.getElementById("registerMessage").textContent = "";
    document.getElementById("loginMessage").className = "message";
    document.getElementById("registerMessage").className = "message";
}

function showMessage(elementId, text, type) {
    const message = document.getElementById(elementId);
    message.textContent = text;
    message.className = "message " + type;
}

loginTab.addEventListener("click", showLogin);
registerTab.addEventListener("click", showRegister);
document.getElementById("showRegister").addEventListener("click", function(event) {
    event.preventDefault();
    showRegister();
});
document.getElementById("showLogin").addEventListener("click", function(event) {
    event.preventDefault();
    showLogin();
});

registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        showMessage("registerMessage", "Passwords do not match!", "error");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        showMessage("registerMessage", "This email is already registered!", "error");
        return;
    }

    users.push({ name: name, email: email, password: password });
    localStorage.setItem("users", JSON.stringify(users));

    showMessage("registerMessage", "Registration Successful! You can now login.", "success");
    registerForm.reset();
});

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(user => user.email === email && user.password === password);

    if (matchedUser) {
        showMessage("loginMessage", "Login Successfully! Welcome, " + matchedUser.name + ".", "success");
    } else {
        showMessage("loginMessage", "Invalid Email or Password!", "error");
    }
});
