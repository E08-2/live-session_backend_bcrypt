import createError from "http-errors";
import User from "../models/user.js";

export const registerPost = async (req, res, next) => {
    const { username, password, firstName, lastName, emailAddress } = req.body;

    // Step 1: Make sure the username has not already been taken
    let foundUsername;

    try {
        foundUsername = await User.findOne({ username: username });
    } catch {
        return next(createError(500, "Database could not be queried. Please try again"));
    }

    if (foundUsername) {
        return next(createError(409, "Username has already been taken. Please try a different username"));
    }

    // Step 2: Make sure the email address has not already been taken
    let foundEmail;

    try {
        foundEmail = await User.findOne({ emailAddress: emailAddress });
    } catch {
        return next(createError(500, "Database could not be queried. Please try again"));
    }

    if (foundEmail) {
        return next(createError(412, "Email address has already been used to create an account. Please try a different email address"));
    }

    const newUser = new User({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        albums: []
    });

    try {
        await newUser.save();   // We could get a validation error here if the schema is not fulfilled
    } catch {
        return next(createError(500, "User could not be created. Please try again"));
    }

    // Send a response to the client containing the new user object in a JSON format
    res.status(201).json({ id: newUser._id });
}