const express = require("express")
const router = express.Router()

//Controller
const { insertPhoto,  removePhoto, getAllPhotos, getUserPhotos,
        getPhotoById,updatePhoto,likePhoto,commentPhoto,searchPhotos } = require("../controllers/PhotoController");

//Middlewares    
const {photoInsertValidation, photoUpdateValidation, commentsValidation} = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/hadleValidation");
const {imageUpload} = require("../middlewares/imageUpload");

//routes
router.post("/",authGuard, imageUpload.single("image"), photoInsertValidation() , validate, insertPhoto );
router.delete("/:id", authGuard,  removePhoto );
router.get("/search", authGuard, searchPhotos);
router.get("/all",authGuard, getAllPhotos);
router.get("/user/:id",authGuard, getUserPhotos);
router.get("/:id", authGuard, getPhotoById);
router.put("/:id",authGuard, photoUpdateValidation() ,updatePhoto);
router.put("/like/:id",authGuard,likePhoto);
router.put("/comment/:id", authGuard, commentsValidation() , commentPhoto);


module.exports = router;