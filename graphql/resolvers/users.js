const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const User = require("./../../models/User");
const { SECRET } = require("./../../config");
const { validateRegisterUser, validateLogin } = require("./../../utils/validators");

function _generateJWTToken(user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            username: user.username
        },
        SECRET,
        { expiresIn: "1h" }
    );
}

module.exports = {
    Mutation: {

        // Login user functionality
        async login(_, { loginInput: {username, password}}) {

            // Perform validations
            const { errors, valid } = validateLogin(username, password);
            if (!valid) {
                throw new UserInputError("Invalid Inputs", { errors });
            }

            // find the user
            // TODO: wrap inside try catch
            const user = await User.findOne({ username });
            if (!user) {
                throw new UserInputError("Invalid Inputs", {
                    errors: {
                        username: "Username is not found"
                }});
            }

            // compare the password
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                throw new UserInputError("Invalid Credentials", {
                   errors: {
                       general: "Invalid credentials"
                   } 
                });
            }

            // generate and return token
            const token = _generateJWTToken(user);
            return {
                ...user._doc,
                id: user._id,
                token
            };
        },

        // Register User functionality
        async register(_, { registerInput: {username, email, password, confirmPassword }}) {
            
            // Perform validations
            const { errors , valid } = validateRegisterUser(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError("Invalid Inputs", {
                    errors
                });
            }

            
            // find if the user already exists
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError("Username is already taken", {
                    errors: {
                        username: "Username is already taken"
                    }
                });
            }

            // insert the new user and return a token
            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                username,
                password,
                email,
                createdAt: new Date().toISOString()
            });
            try {
                const res = await newUser.save();
                const token = _generateJWTToken(res);
                return {
                    ...res._doc,
                    id: res._id,
                    token
                };

            } catch (exception) {
                // failed to register user
                throw new UserInputError("Failed to save user", {
                    errors: {
                        database: "failed to save to DB",
                        detail: exception
                    }
                });
            }
        }
    }
};