let request = obj  =>{
    return new Promise((resolve,reject)=>{
        let http = new XMLHttpRequest();
        http.open(obj.method || "GET", obj.url, true);
        http.overrideMimeType("application/json");
        if(obj.headers){
            Object.keys(obj.headers).forEach(key=>{
                http.setRequestHeader(key, obj.headers[key]);
            });
        }
        http.onreadystatechange = () => {
            if(http.readyState == 4){
                if (http.status >= 200 && http.status < 300) {
                    resolve(http.responseText);
                } else {
                    reject(http.statusText);
                }
            }
        };
        http.onerror = () => reject(http.statusText);
        http.send(obj.body || null);
    });
}

export{request}