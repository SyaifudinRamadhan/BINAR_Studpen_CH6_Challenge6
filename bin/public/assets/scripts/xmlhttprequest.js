const requestServer = (url, method, body, callback, setHeader=true) => {
    // Metode XHTTPRequest
    const xhttp = new XMLHttpRequest();
    xhttp.onload = () => {
        let JSONData = JSON.parse(xhttp.response);
        JSONData.status = xhttp.status;
        console.log(JSONData, xhttp.status,'ini hasil response');
        callback(JSONData);
    }
    xhttp.open(method, url);
    if(setHeader == true){
        xhttp.setRequestHeader('Content-Type', 'application/json');
    }
    xhttp.send(body);
}