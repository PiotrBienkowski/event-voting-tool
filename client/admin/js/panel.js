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

async function addBattle() {
    name1 = document.getElementById("name1").value;
    name2 = document.getElementById("name2").value;
    email = getCookieValue("email")
    password_hash = getCookieValue("password_hash")
    
    tmp = await sendDataToAPI({ name1: name1, name2: name2, email: email, password_hash: password_hash}, "/create-battle")
    console.log(tmp)
    getBattles();
}

async function getBattles() {
    email = getCookieValue("email")
    password_hash = getCookieValue("password_hash")

    tmp = await sendDataToAPI({ email: email, password_hash: password_hash}, "/all-battles")
    console.log(tmp["tab"])

    document.getElementById("container").innerHTML = ""
    
    for (let i = 0; i < tmp["tab"].length; i++) {
        console.log(tmp["tab"][i]["name1"]);
        const div = document.createElement("div");
        div.setAttribute("id", tmp["tab"][i]["uniqueID"]);
        container.appendChild(div);
        document.getElementById(tmp["tab"][i]["uniqueID"]).innerHTML = tmp["tab"][i]["name1"] + " vs " + tmp["tab"][i]["name2"] + " <button>rozpocznij bitwę</button>";
    }
}