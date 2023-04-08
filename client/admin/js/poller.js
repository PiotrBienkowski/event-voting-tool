getPollers()
cnt = 0

function logOutClient() {
    logOut();
    window.location.href = 'login.html';
}

async function addPollers() {
    document.getElementById("error").innerHTML = ""

    codes = document.getElementById("codes").value;
    email = getCookieValue("email")
    password_hash = getCookieValue("password_hash")

    tmp = await sendDataToAPI({email: email, password_hash: password_hash, codes: codes}, "/create-pollers")

    document.getElementById("codes").value = ""

    if (tmp["error"].length > 0) {
        document.getElementById("error").innerHTML = ""
        const div = document.getElementById("error");
        for (let i = 0; i < tmp["error"].length; i++) {
          const p = document.createElement("p");
          p.textContent = tmp["error"][i];
          p.style.color = "red";
          div.appendChild(p);
        }
    }

    getPollers()
}

async function getPollers() {
    email = getCookieValue("email")
    password_hash = getCookieValue("password_hash")

    tmp = await sendDataToAPI({ email: email, password_hash: password_hash}, "/all-pollers")
    
    tmp["tab"].reverse();

    document.getElementById("pollers").innerHTML = ""
    const div = document.getElementById("pollers");
    for (let i = 0; i < tmp["tab"].length; i++) {
        const p = document.createElement("p");
        p.textContent = tmp["tab"][i]["code"] + " - " + tmp["tab"][i]["cnt"];
        div.appendChild(p);
    }
}

function toggleMenu() {
    if (cnt == 0 || document.getElementById("controlBox").style.display == "none") {
        document.getElementById("controlBox").style.display = "block"
    } else {
        document.getElementById("controlBox").style.display = "none"
    }
    cnt += 1
}