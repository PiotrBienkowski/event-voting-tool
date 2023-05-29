auth();
start();

async function auth() {
    if(!(await checkLogin())) {
        logOut();
        window.location.href = 'login.html';
    }
}

function logOutClient() {
    document.getElementById("loading").style.display = "block";
    logOut();
    window.location.href = 'login.html';
    document.getElementById("loading").style.display = "none";
}

function start() {
    document.getElementById("loading").style.display = "block";
    document.getElementById("codeTitle").innerHTML = getCookieValue("viewer_code")
    document.getElementById("loading").style.display = "none";
}

async function loginBattle() {
    document.getElementById("loading").style.display = "block";
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
    document.getElementById("loading").style.display = "none";
}