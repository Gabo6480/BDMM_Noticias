export class User{

    constructor(username, email, password, pp){
        this.username = username;
        this.email = email;
        this.password = password;
        
        if(pp)
            this.pp = pp;
    }
}