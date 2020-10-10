let request = obj  =>{
    return new Promise((resolve,reject)=>{
        let http = new XMLHttpRequest();
        http.open(obj.method || "GET", obj.url);
        if(obj.headers){
            Object.keys(obj.headers).forEach(key=>{
                http.setRequestHeader(key, obj.headers[key]);
            });
        }
        http.onload = () => {
            if (http.status >= 200 && http.status < 300) {
                resolve(http.response);
            } else {
                reject(http.statusText);
            }
        };
        http.onerror = () => reject(http.statusText);
        http.send(obj.body)
    });
}

export{request}