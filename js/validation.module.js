
const validate_email = function(email){
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

const validate_empty = function(input){
    return input && input.value != '';
}

const validate_username = function(username){
    return /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username);
}

export{validate_email, validate_empty, validate_username}