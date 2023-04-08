auth();
getBattles();

cnt = 0

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

function showDetails(code) {
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
    getBattles();
    document.getElementById("name1").value = ""
    document.getElementById("name2").value = ""
}

async function getBattles() {
    email = getCookieValue("email")
    password_hash = getCookieValue("password_hash")

    tmp = await sendDataToAPI({ email: email, password_hash: password_hash}, "/all-battles")

    document.getElementById("container").innerHTML = ""
    
    tmp["tab"].reverse();

    for (let i = 0; i < tmp["tab"].length; i++) {
        const div = document.createElement("div");
        div.setAttribute("id", tmp["tab"][i]["uniqueID"]);
        container.appendChild(div);
        document.getElementById(tmp["tab"][i]["uniqueID"]).innerHTML = '<div id="b_' + tmp["tab"][i]["uniqueID"] + '" class="battle"><div class="topLine"><p><b>' + tmp["tab"][i]["name1"] + '</b> vs <b>' + tmp["tab"][i]["name2"] + '</b> - ' + tmp["tab"][i]["code"] + '</p><img id="a_' + tmp["tab"][i]["uniqueID"] + '" onclick="showDetails(' + "'" + tmp["tab"][i]["uniqueID"] + "')" + '" src="images/arrow.svg" alt=""></div><div id="d_' + tmp["tab"][i]["uniqueID"] + '" class="details" style="display: none;"><p>Status: <span id="s_' + tmp["tab"][i]["uniqueID"] + '">Zablokowane</span></p><button id="sb_' + tmp["tab"][i]["uniqueID"] + '" onclick="toggleStatus(' + "'"  + tmp["tab"][i]["uniqueID"] + "'" + ')">Odblokuj</button> <button onclick="openBattle(' + "'" + tmp["tab"][i]["uniqueID"] + "'" + ')">Pokaz Bitwę</button></div></div>';
    }

    for (let i = 0; i < tmp["tab"].length; i++) {
        if(tmp["tab"][i]["status"]) {
            document.getElementById("b_" + tmp["tab"][i]["uniqueID"]).style.border = "3px solid #98FF98";
            document.getElementById("s_" + tmp["tab"][i]["uniqueID"]).innerHTML = "Odblokowane";
            document.getElementById("sb_" + tmp["tab"][i]["uniqueID"]).innerHTML = "Zablokuj";
        }
    }

}

async function toggleStatus(code) {
    email = getCookieValue("email")
    password_hash = getCookieValue("password_hash")
    tmp = await sendDataToAPI({ uniqueID: code, email: email, password_hash: password_hash, password_hash: password_hash}, "/toggle-battle")
    await getBattles();
    showDetails(code);
}

function openBattle(code) {
    window.open('battle.html?uid=' + code, '_blank');
}

function toggleMenu() {
    if (document.getElementById("controlBox").style.display == "none" || cnt == 0) {
        document.getElementById("controlBox").style.display = "block"
    } else {
        document.getElementById("controlBox").style.display = "none"
    }
    cnt += 1
}