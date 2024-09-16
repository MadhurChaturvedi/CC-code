// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';

// // Configuration
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null && console.log("localFilePath is not found!!");
//         // upload the file on cloudnay
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: 'auto',
//         })
//         // file has been uploaded successfull
//         console.log("file is uploaded on cloudinary  -> ", response.url);
//         return response
//     }
//     catch (err) {
//         // fs.unlinkSync(localFilePath)
//         console.log("catch part run cloudinary 🤨");

//     }
// }

// export { uploadOnCloudinary }


import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("localFilePath is not found!!");
            return null;
        }

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });

        // Log the Cloudinary URL of the uploaded file
        console.log("File uploaded to Cloudinary -> ", response.url);

        // Optionally delete the local file after successful upload
        fs.unlinkSync(localFilePath);
        console.log("Local file deleted successfully.");

        return response;
    } catch (err) {
        console.error("Error during Cloudinary upload: ", err);

        // Optionally handle file deletion on error
        if (fs.existsSync(localFilePath)) {
            // fs.unlinkSync(localFilePath);
            console.log("Local file deleted due to error.");
        }
        return null;
    }
}

export { uploadOnCloudinary };