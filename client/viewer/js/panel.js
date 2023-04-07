auth();
start();

async function auth() {
    if(!(await checkLogin())) {
        logOut();
        window.location.href = 'login.html';
    }
}

function logOutClient() {
    logOut();
    window.location.href = 'login.html';
}

function start() {
    document.getElementById("codeTitle").innerHTML = getCookieValue("viewer_code")
}