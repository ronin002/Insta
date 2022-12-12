const {body} = require("express-validator")

const photoInsertValidation = () => {

        return [
            body("title")
                .not()
                .equals("undefined").withMessage("Title photo is mandatory")
                .isString().withMessage("Title photo is mandatory")
                .isLength({min:3}).withMessage("Title lenght: minium 3 characters"),
            body("image").custom((value,{ req }) =>{
                if (!req.file){
                    throw new Error("Image is mandatory");
                }
                return true;
            }),


        ]

}

module.exports = {
    photoInsertValidation
}