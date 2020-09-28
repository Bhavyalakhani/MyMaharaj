export const Notification = (id, title, message) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "key = AAAA6yaW6cg:APA91bHWzoZvslHI5SoOoGtnQGUBj6D8QNOcjeUwygh6T-edyGHLPQeIu9Lk2fpJd2zxyQEwI7CNKutRYzZujN2jOSfreD781rGWKjHB8mgp1AlbJ7rUYmzaZXtloHRD30Q7Em86kZik");

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