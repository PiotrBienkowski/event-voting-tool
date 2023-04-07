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

act_res1 = 50;
act_res2 = 50;

set_result(act_res1, act_res2);
set_code("FHY312");
set_players("Jan Bartkowiak", "Bartek Janowiak");

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

setInterval(random_generator, 1000); 