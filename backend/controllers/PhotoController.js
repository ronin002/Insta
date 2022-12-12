const Photo = require("../models/Photo")
const User = require("../models/User")

const mongoose = require("mongoose")

//Insert a photo
const insertPhoto = async (req,res) => {

    const{title} = req.body;
    const image = req.file.filename;

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    //Create Photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    })

    // If photo was created

    if(!newPhoto){
        res.status(422).json({errors:["Error: PX 001 - Please try again later"]});
    }
    res.status(201).json(newPhoto);
    // console.log(req.body);

    // res.send("Photo Inserted");
}

module.exports = {insertPhoto}