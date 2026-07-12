const db = require('../configDb');
const { validateUser } = require('../utlis/validateUser');

module.exports.login = async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({
            success: false,
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
                success: false,
                message: "Invalid credentials"
            });
        }

        const loginStatus = await validateUser(req.body, rows[0]);

        if (loginStatus.statusCode === 401) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        res.cookie("token", loginStatus.token, {
            httpOnly: true,
            secure: false,      // true in production (HTTPS)
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000  // 1 day
        });

        // console.log("Login Successful", loginStatus.token);  unComment this line to see the token in the console for debugging/testing purposes

        return res.status(200).json({
            success: true,
            message: "Login Successful"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};