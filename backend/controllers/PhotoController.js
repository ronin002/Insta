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
        return;
    }
    res.status(201).json(newPhoto);
    // console.log(req.body);

    // res.send("Photo Inserted");
}

const removePhoto = async (req,res) => {

    const{id} = req.params;
    const reqUser = req.user;


    try {

        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        //Exists?
        if (!photo){
            res.status(404).json({errors:["Error: PXD001 - Photo don't found"]});
            return;
        }
        else if(!photo.userId.equals(reqUser._id)){
            res.status(422).json({errors:["Error: PXD002 - Access denied"]});
            return;
        }

        await Photo.findByIdAndDelete(photo._id);

        res.status(200).json({id: photo._id, message: "Photo deleted"});

    } catch (error) {

        res.status(404).json({errors:["Error: PXD001 - Photo don't found"]});
        return;

    }

}

const getAllPhotos = async (req,res) => {


    const photos = await Photo.find({}).sort([["createdAt",-1]]).exec();

    return res.status(200).json(photos);
}

const getUserPhotos = async (req, res) => {
    
    const id = req.params;

    const photos = await Photo.find({ userId: id })
            .sort([["createdAt",-1]])
            .exec();

    return res.status(200).json(photos);

}

module.exports = {
    insertPhoto,
    removePhoto,
    getAllPhotos,
    getUserPhotos,
}