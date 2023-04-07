function set_result(res1, res2) {
    res1 = Math.round(res1);
    res2 = Math.round(res2);
    document.getElementById("res1").innerHTML = res1.toString();
    document.getElementById("box1").style.height = res1.toString() + "%";

    document.getElementById("res2").innerHTML = res2.toString();
    document.getElementById("box2").style.height = res2.toString() + "%";
}

function set_code(code) {
    document.getElementById("code").innerHTML = code.toString();
}

function set_players(name1, name2) {
    document.getElementById("name1").innerHTML = name1.toString();
    document.getElementById("name2").innerHTML = name2.toString();
}

set_result(50, 50);
cnt = 0

async function update() {
    cnt += 1
    if (cnt > 1800) {
        clearInterval(intervalId);
    }
    console.log("XDD")
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get('uid');

    if (uid == null) {
        window.location.href = 'panel.html';
    }

    email = getCookieValue("email")
    password_hash = getCookieValue("password_hash")

    tmp = await sendDataToAPI({ email: email, password_hash: password_hash, uniqueID: uid}, "/battle-info")

    if (tmp["status"]) {
        if (tmp["battle"]["status"]) {
            set_code(tmp["battle"]["code"]);
        } else {
            set_code("Zablokowane");
        }

        set_players(tmp["battle"]["name1"], tmp["battle"]["name2"]);

        res1 = tmp["battle"]["votes1"]
        res2 = tmp["battle"]["votes2"]
        if (res1 == res2) {
            set_result(50, 50);
        } else if (res1 == 0) {
            set_result(0, 100);
        } else if (res2 == 0) {
            set_result(100, 0);
        } else {
            sum = res1 + res2
            left = Math.floor((res1 / sum) * 100);
            set_result(left, 100 - left);
        }
    }
}

function random_generator() {
    random_int = Math.floor(Math.random() * 10);
    if (Math.floor(Math.random() * 1001) % 2 == 0 && act_res1 + random_int <= 100 || act_res1 - random_int < 0)
    {
        act_res1 += random_int;
        act_res2 -= random_int;
    } else {
        act_res1 -= random_int;
        act_res2 += random_int;
    }
    set_result(act_res1, act_res2);
}
update()
const intervalId = setInterval(update, 1000); 