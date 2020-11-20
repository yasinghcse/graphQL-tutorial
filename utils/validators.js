module.exports.validateRegisterUser = ( username, email, password, confirmPassword) => {
    const errors = {};

    // username validations
    if (username.trim() === "") {
        errors.username= "Username cannot be empty";
    }

    // email validations
    if (email.trim() === "") {
        errors.email = "Email cannot be empty";
    } else {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.match(regex)) {
            errors.email = "Email must be valid";
        }
    }

    // password validations
    if (password === "") {
        errors.password = "Password cannot be empty";
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Password must match";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };

};