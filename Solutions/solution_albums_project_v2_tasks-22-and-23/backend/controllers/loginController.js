import createError from "http-errors";
import bcrypt from "bcryptjs";

import User from "../models/user.js";


export const loginPost = async (req, res, next) => {
    // Take the username and password the user tried to log in with
    const { username, password } = req.body;

    // Search inside the "users" collection of the "albums-project" db
    // Do any documents have the SAME username AND password?
    let found;

    try {
        found = await User.findOne({ username: username });
    } catch {
        return next(createError(500, "Database couldn't be queried. Please try again"));
    }

    // If we found a user in our db with the same login details as we received from the frontend...
    // Send that user's id back the frontend in the response for further processing
    if (found) {

        let isValidPassword;

        try {
            // Compare plain text password from frontend with hashed password in database
            // If the hash is the same as the plain text password, isValidPassword = true
            // If the hash is not the same, isValidPassword = false
            isValidPassword = await bcrypt.compare(password, found.password);
        } catch {
            return next(createError(500, "Logging in process failed. Please try again"));
        }

        if (!isValidPassword) {
            return next(createError(401, "Incorrect password. Please try again"));
        }

        res.json({ id: found._id });
        // If we found no user in our db with the same login details as we received from the frontend
        // (E.g. the person logging in made a mistake with their username/password/both!)
        // Create an error object with a relevant message and statusCode, and pass it to the error handling middleware
    } else {
        const err = new Error("No user exists with this username. Please try again");  // Message
        err.statusCode = 404;   // "Not Found"
        next(err);
    }
}