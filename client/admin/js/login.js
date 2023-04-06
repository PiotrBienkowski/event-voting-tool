
auth();

async function auth() {
    if ((await checkLogin())) {
        window.location.href = 'panel.html';
    }
}

async function login_user_form() {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    document.getElementById("password").value = "";

    tab = await prepare_login_data(email, password);

    if (tab.status == true) {
        console.log("Zalogowano");

        password_hash = await APIHash(password);
        password = ""
        
        setCookie("password_hash", password_hash);
        setCookie("email", email);
        console.log("git")
        window.location.href = 'panel.html';
    } else {
        document.getElementById("error").style.display = "block";
    }
}

async function prepare_login_data(email, password) {
    password = String(password)
    password_hash = await APIHash(password);
    password = ""

    return sendDataToAPI({ email: email, password_hash: password_hash}, "/login");
}