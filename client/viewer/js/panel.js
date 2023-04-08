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

async function loginBattle() {
    battleCode = document.getElementById("battleCode").value.toUpperCase();
    pollerCode = getCookieValue("viewer_code");

    tmp = await sendDataToAPI({battleCode: battleCode, pollerCode: pollerCode}, "/battle-login")

    console.log(tmp)
    if (!tmp["status"] && tmp["message"] == "pnf") {
        logOutClient()
    }
    
    if (!tmp["status"]) {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = tmp["message"];
    } else {
        window.location.href = 'battle.html?code=' + battleCode;
    }
}