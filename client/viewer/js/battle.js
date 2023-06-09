auth();
start();

async function auth() {
    if(!(await checkLogin())) {
        logOut();
        window.location.href = 'login.html';
    }
}

async function start() {
    document.getElementById("loading").style.display = "block";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const battleCode = urlParams.get('code');

    if (battleCode == null) {
        window.location.href = 'index.html';
    }

    pollerCode = getCookieValue("viewer_code");
    tmp = await sendDataToAPI({battleCode: battleCode, pollerCode: pollerCode}, "/battle-login")
    if (!tmp["status"]) {
        window.location.href = 'index.html';
    }

    console.log(tmp)

    document.getElementById("button1").innerHTML = tmp["info"]["name1"]
    document.getElementById("button2").innerHTML = tmp["info"]["name2"]
    document.getElementById("loading").style.display = "none";
}

async function vote(player) {
    document.getElementById("loading").style.display = "block";
    if (player == 1 || player == 2) {
        pollerCode = getCookieValue("viewer_code");
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const battleCode = urlParams.get('code');

        if (battleCode == null) {
            window.location.href = 'index.html';
        }

        tmp = await sendDataToAPI({battleCode: battleCode, pollerCode: pollerCode, player: player}, "/battle-vote")

        console.log(tmp)

        document.getElementById("message").style.display = "block";
        document.getElementById("message").innerHTML = tmp["message"];

        document.getElementById("voteBox").style.display = "none";

        setTimeout(function() {
            window.location.replace("index.html");
        }, 4000);
    }
    document.getElementById("loading").style.display = "none";
}