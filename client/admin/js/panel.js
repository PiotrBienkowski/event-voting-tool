async function auth() {
    if(!(await checkLogin())) {
        logOut();
        window.location.href = 'login.html';
    }
}

auth();
getBattles();

function logOutClient() {
    logOut();
    window.location.href = 'login.html';
}

function showDetails(code) {
    console.log("DUPA")
    if (document.getElementById("d_" + code).style.display != "none") {
        document.getElementById("d_" + code).style.display = "none";
        document.getElementById("a_" + code).style.transform = "rotate(-90deg)"
    } else {
        document.getElementById("d_" + code).style.display = "block";
        document.getElementById("a_" + code).style.transform = "rotate(90deg)";
    }
}

async function addBattle() {
    name1 = document.getElementById("name1").value;
    name2 = document.getElementById("name2").value;
    email = getCookieValue("email")
    password_hash = getCookieValue("password_hash")
    
    tmp = await sendDataToAPI({ name1: name1, name2: name2, email: email, password_hash: password_hash}, "/create-battle")
    console.log(tmp)
    getBattles();
    document.getElementById("name1").value = ""
    document.getElementById("name2").value = ""
}

async function getBattles() {
    email = getCookieValue("email")
    password_hash = getCookieValue("password_hash")

    tmp = await sendDataToAPI({ email: email, password_hash: password_hash}, "/all-battles")
    console.log(tmp["tab"])

    document.getElementById("container").innerHTML = ""
    
    tmp["tab"].reverse();

    for (let i = 0; i < tmp["tab"].length; i++) {
        const div = document.createElement("div");
        div.setAttribute("id", tmp["tab"][i]["uniqueID"]);
        container.appendChild(div);
        document.getElementById(tmp["tab"][i]["uniqueID"]).innerHTML = '<div id="b_' + tmp["tab"][i]["uniqueID"] + '" class="battle"><div class="topLine"><p><b>' + tmp["tab"][i]["name1"] + '</b> vs <b>' + tmp["tab"][i]["name2"] + '</b></p><img id="a_' + tmp["tab"][i]["uniqueID"] + '" onclick="showDetails(' + "'" + tmp["tab"][i]["uniqueID"] + "')" + '" src="images/arrow.svg" alt=""></div><div id="d_' + tmp["tab"][i]["uniqueID"] + '" class="details" style="display: none;"><p>Status: <span id="s_' + tmp["tab"][i]["uniqueID"] + '">Zablokowane</span></p><button id="sb_' + tmp["tab"][i]["uniqueID"] + '">Odblokuj</button> <button>Pokaz Bitwę</button></div></div>';
    }

    for (let i = 0; i < tmp["tab"].length; i++) {
        console.log(tmp["tab"][i])
        if(tmp["tab"][i]["status"]) {
            document.getElementById("b_" + tmp["tab"][i]["uniqueID"]).style.border = "3px solid #98FF98";
            document.getElementById("s_" + tmp["tab"][i]["uniqueID"]).innerHTML = "Odblokowane";
            document.getElementById("sb_" + tmp["tab"][i]["uniqueID"]).innerHTML = "Zablokuj";
        }
    }

}