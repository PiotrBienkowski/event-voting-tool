API_link = "http://127.0.0.1:8000"

function logOut() {
    deleteCookie("viewer_code");
    return true;
}

async function checkLogin() {
    code = getCookieValue("viewer_code")
    if (code == -1) {
        return false
    }

    tmp = await sendDataToAPI({code: code}, "/auth-code")

    return tmp["status"]
}

function setCookie(cookieName, cookieValue) {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const options = 'path=/; expires=' + expirationDate.toUTCString();
    document.cookie = cookieName + '=' + cookieValue + '; ' + options;
}  

function getCookieValue(cookieName) {
    const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith(cookieName + '='));
    if (cookie === undefined) {
        return -1;
    }
    return decodeURIComponent(cookie.trim().substring(cookieName.length + 1));
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function sendDataToAPI(tmp_data, link) {
    const data = tmp_data
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(API_link + link, options)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => console.log(error));
}

async function APIHash(text) {
    //  TODO: Change it because sending the password to the API is not secure
    
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const queryString = new URLSearchParams({ text: text }).toString();
    const url = `${API_link + "/hash"}?${queryString}`;
    return fetch(url, params)
      .then((response) => response.json())
      .then((data) => {
        return data.hash.toString();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
}