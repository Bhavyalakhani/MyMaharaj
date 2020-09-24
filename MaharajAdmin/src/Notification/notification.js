export const Notification = (id, title, message) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "key = AAAABGEWKFQ:APA91bEhY4wLEjOzIS46A8Dwlkyeou88hCIPcr6KYrdzigzYxlLDVYzso__dMaa6TH63RIBhLgU3kmxg-JjG-SaLmXRmpJYVW--fFm8nsksHNIee753R6N1EIXXjyd7zfuAmiNGs8etI");

    var raw = JSON.stringify({ "to": id, "notification": { "title": title, "body": message, "mutable_content": true, "sound": "Tri-tone" }, "data": {} });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}