const {body} = require("express-validator")

const userCreateValidation = () => {
    return [
        body("name")
            .isString().withMessage("Name is mandatory")
            .isLength({min:3}).withMessage("Name needs at least 3 characters"),
        body("email")
            .isString().withMessage("Email is mandatory")
            .isEmail().withMessage("Email invalid"),
        body("password")
            .isString().withMessage("Password is mandatory")
            .isLength({min:8}).withMessage("Password needs least 8 characters"),
        body("confirmPassword")
            .isString().withMessage("Confirm password is mandatory")
            .custom((value,{req}) =>{
                if (value != req.body.password){
                    throw new Error("Passwords don't match");
                }
                return true;
            }),
            
    ];
}

const loginValidation = () => {
    return [
        body("email")
            .isString().withMessage("Email is mandatory")
            .isEmail().withMessage("Email invalid"),
        body("password")
            .isString().withMessage("Password is mandatory")

    ]
}

const userUpdateValidation = () => {
    return[
        body("name")
            .optional()
            .isLength({min:3}).withMessage("Name needs at least 3 characters"),
        body("password")
            .optional()
            .isLength({min:8}).withMessage("Password needs least 8 characters"),
        // body("confirmPassword")
        //     .optional()
        //     .custom((value,{req}) =>{
        //         if (value != req.body.password){
        //             throw new Error("Passwords don't match");
        //         }
        //         return true;
        //     }),
    ]
}

module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation,
};