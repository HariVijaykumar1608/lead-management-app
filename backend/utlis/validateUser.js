const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.validateUser = async (payload,dbData) => {
    const isMatch = await bcrypt.compare(
        payload.password,
        dbData.password
    );

    if (!isMatch) {
        return {
            statusCode : 401,
            message : "Invalid credentials"
        }
    }
    else {
        const token = jwt.sign(
            {
                id: dbData.id,
                username: dbData.userName
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return {
            statusCode : 200,
            token
        }
    }
};