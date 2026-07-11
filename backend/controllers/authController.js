const db = require('../configDb');
const { validateUser } = require('../utlis/validateUser');

module.exports.login = async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({
            message: "userName and password are required"
        });
    }

    try {
        const [rows] = await db.promise().query(
            "SELECT * FROM users WHERE userName = ?",
            [userName]
        );

        if (!rows.length) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const loginStatus = await validateUser( req.body, rows[0]);

        if (loginStatus.statusCode === 401) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        console.log("Login successful, token generated:", loginStatus.token);

        res.cookie("token", loginStatus.token, {
            httpOnly: true,
            secure: false,      // true in production (HTTPS)
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000  // 1 day
        });

        return res.status(200).json({
            message: "Login Successful"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};