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
        if (!localFilePath) return null && console.log("localFilePath is not found!!");
        // upload the file on cloudnay
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary  -> ", response.url);
        return response
    }
    catch (err) {
        fs.unlinkSync(localFilePath)
        console.log("catch part run cloudinary 🤨");

    }
}

export { uploadOnCloudinary }

