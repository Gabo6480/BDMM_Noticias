
const validate_email = function(email){
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

const validate_empty = function(input){
    return input && input.value != '';
}

const validate_username = function(username){
    return /^[\w]+([-_\s]{1}[a-z0-9]+)*$/i.test(username);
}

export{validate_email, validate_empty, validate_username}