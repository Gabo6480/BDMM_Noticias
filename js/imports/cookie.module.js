//Esta es para hacer el logout
let clearStorage = function(){
    window.localStorage.clear();
}

let storeUser = function(user){
    window.localStorage.setItem("storedUser.userId", user.userId);
    window.localStorage.setItem("storedUser.userName", user.userName);

}

let getStoredUser = function(){
    let user = {
        userId: window.localStorage.getItem("storedUser.userId"),
        userName: window.localStorage.getItem("storedUser.userName")
    }
    return user;
}


export{clearStorage,storeUser, getStoredUser}