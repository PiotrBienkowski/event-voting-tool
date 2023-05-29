auth();

async function auth() {
    if (await checkLogin()) {
        window.location.href = 'index.html';
    }
}

async function login_viewer_form() {
    document.getElementById("loading").style.display = "block";
    code = document.getElementById("code").value;
    tmp = await sendDataToAPI({code: code}, "/auth-code")

    if (tmp["status"]) {
        setCookie("viewer_code", code)
        console.log("Zalogowano");
        window.location.href = 'index.html';
    } else {
        document.getElementById("error").style.display = "block"
    }

    document.getElementById("loading").style.display = "none";
}