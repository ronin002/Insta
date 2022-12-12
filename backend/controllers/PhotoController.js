const Photo = require("../models/Photo")

const mongoose = require("mongoose")

//Insert a photo
const insertPhoto = async (req,res) => {

    const{title} = req.body;
    const image = req.file.filename;

    console.log(req.body);

    res.send("Photo Inserted");
}

module.exports = {insertPhoto}