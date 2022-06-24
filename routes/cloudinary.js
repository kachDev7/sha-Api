const cloudinary = require('cloudinary')
require('dotenv/config');

// configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// Set up and Export cloudinary taskload: 
// FILE accepts server path of the image
// FOLDER tells cloudinary where to save the image
exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        // Save FILE and return a RESULT and pass to the callback function.
        // Then resolve only URL and ID
        cloudinary.uploader.upload(file, (result) =>{
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}
