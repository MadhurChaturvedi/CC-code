import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js'
import { User } from "../models/user.model.js";
import { uploadCloudnary } from '../utils/cloudnary.js'
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user details or playload form frontend 
    // validation - empty
    // check if user already exist: usename,emial
    // check for images, check for avatar 
    // upload them to cloudinary , avatar
    // create user object - create entry in db
    // remove password and refresh token fild from response
    // check for user createion
    // return res

    const { username, email, fullName, password } = req.body
    console.log("email", email);

    if ([fullName, email, password].some((fields) => fields?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username alredy exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadCloudnary(avatarLocalPath)
    const coverImage = await uploadCloudnary(coverImageLocalPath)

    if (!avatar) {
        throw ApiError(400, "Avatar file is required")
    }

    const newUser = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "somthing went woring while registring the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

export { registerUser }