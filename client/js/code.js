function set_result(res1, res2) {
    res1 = Math.round(res1);
    res2 = Math.round(res2);
    document.getElementById("res1").innerHTML = res1.toString();
    document.getElementById("box1").style.height = res1.toString() + "%";

    document.getElementById("res2").innerHTML = res2.toString();
    document.getElementById("box2").style.height = res2.toString() + "%";
}

act_res1 = 50;
act_res2 = 50;

set_result(act_res1, act_res2);

function tmp() {
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

setInterval(tmp, 1000); 