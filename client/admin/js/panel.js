
async function auth() {
    if(!(await checkLogin())) {
        logOut();
        window.location.href = 'login.html';
    }
}

auth();

function logOutClient() {
    logOut();
    window.location.href = 'login.html';
}