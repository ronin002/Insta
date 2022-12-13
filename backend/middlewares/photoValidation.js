const {body} = require("express-validator")

const photoInsertValidation = () => {

        return [
            body("title")
                .optional()
                //.not().equals("undefined").withMessage("Title photo is mandatory")
                .isString().withMessage("Title photo is mandatory")
                .isLength({min:3}).withMessage("Title lenght: minimum 3 characters"),
            body("image").custom((value,{ req }) =>{
                if (!req.file){
                    throw new Error("Image is mandatory");
                }
                return true;
            }),


        ]

}

const photoUpdateValidation = () => {

    return[
        body("title")
            .optional()
            .isString().withMessage("Title photo is mandatory")
            .isLength({min:3}).withMessage("Title lenght: minimum 3 characters"),
    ]

}

const commentsValidation = () => {

    return[
        body("comment")
            .isString().withMessage("Comment is mandatory")
            .isLength({min:3}).withMessage("Comment lenght: minimum 3 characters"),
    ]

}

module.exports = {
    photoInsertValidation,
    photoUpdateValidation,
    commentsValidation
}