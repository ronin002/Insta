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

    const photos = await Photo.find({ userId: mongoose.Types.ObjectId(id) })
            .sort([["createdAt",-1]])
            .exec();

    res.status(200).json(photos);

}

const getPhotoById = async (req, res) => {

    const id = req.params;

    try {
        
        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        if (!photo){
            res.status(404).json({errors:["Error: PXS001 - Photo not found"]});
            return;
        }

        return res.status(200).json(photo);
        

    } catch (error) {

        res.status(404).json({errors:["Error: PXS003 - Photo not found"]});
        return;
        
    }

}

const updatePhoto = async (req, res) => {

    const {id} = req.params;
    const {title} = req.body;
    const reqUser = req.user;

    try {
    
        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        if (!photo){
            res.status(404).json({errors: ["Error: PXU001 - Photo not found"]});
            return;
        }
        
        if (!photo.userId.equals(reqUser._id)){
            res.status(422).json({errors: ["Error: PXU002 - Access Denied"]});
            return;
        }

        if (title){
            photo.title = title;
        }

        //Photo.findByIdAndUpdate(photo._id);
        await photo.save();

        return res.status(200).json(photo);

    } catch (error) {

        res.status(404).json({errors: ["Error: PXU001 - Photo not found"]});
        return;

    }

}

const likePhoto = async (req, res) => {

    const {id} = req.params;
    const reqUser = req.user;

    try {
        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        if (!photo){
            res.status(404).json({errors: ["Error: PL001 - Photo not found "]});
            return;
        }

        if (photo.likes.includes(reqUser._id)){
            res.status(422).json({errors:["Error: PL002 - Photo alredy had user like"]})
            return;
        }

        photo.likes.push(reqUser._id);

        photo.save();

        return res.status(200).json({photo: id, userId: reqUser._id, message: "Photo liked"});

    } catch (error) {
        res.status(404).json({errors: ["Error: PL001 - Photo not found "]});
        return;
    }

}

const commentPhoto = async (req,res) => {

    const {id} = req.params;
    const comment = req.body;
    const reqUser =  req.user;

    try {
        
        const user = await User.findById(mongoose.Types.ObjectId(reqUser._id));

        if (!user){
            res.status(422).json({errors:["Error: PLC000 - User not found"]});
            return;
        }

        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        if (!photo){
            res.status(404).json({errors:["Error: PLC001 - Photo not found"]});
            return;
        }

        const userComment = {
            comment,
            userName: user.name,
            userImage: user.profileImage,
            userId: user._id
        };

        photo.comments.push(userComment);
        await photo.save();

        return res.status(200).json({photo: id, userComment: reqUser._id, message: "Comment inserted" });

    } catch (error) {
        res.status(404).json({errors:["Error: PLC099 - Photo not found"]});
        return;
    }

}

const searchPhotos = async (req, res) => {

    const {q} = req.query;

    const photos = await Photo.find({title: new RegExp(q,"i")}).exec();
    
    return res.status(200).json(photos);

}

module.exports = {
    insertPhoto,
    removePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto, 
    commentPhoto,
    searchPhotos,
}