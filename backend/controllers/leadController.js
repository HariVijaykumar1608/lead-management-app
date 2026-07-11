const db = require("../configDb");

// GET LEADS
const getLeads = async (req, res) => {
    try {

        const filters = req.query;

        const allowedFilters = [
            "id",
            "name",
            "company",
            "email",
            "phone",
            "source",
            "status"
        ];

        let query = "SELECT * FROM leads";

        const conditions = [];
        const values = [];

        for (const key of Object.keys(filters)) {

            if (allowedFilters.includes(key)) {

                conditions.push(`${key} = ?`);
                values.push(filters[key]);

            }

        }

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }

        query += " ORDER BY created_at DESC";

        const [rows] = await db.promise().query(query, values);

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// CREATE LEAD
const createLead = async (req, res) => {
    try {

        const {
            name,
            company,
            email,
            phone,
            source,
            status,
            notes
        } = req.body;

        const query = `
            INSERT INTO leads
            (name, company, email, phone, source, status, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.promise().query(query, [
            name,
            company,
            email,
            phone,
            source,
            status,
            notes
        ]);

        res.status(201).json({
            success: true,
            message: "Lead created successfully",
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE LEAD
const updateLead = async (req, res) => {
    try {
        const { id } = req.query;

        // Check if lead exists
        const [rows] = await db.promise().query(
            "SELECT * FROM leads WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        const existingLead = rows[0];

        // Use new value if provided, otherwise keep existing value
        const updatedLead = {
            name: req.body.name ?? existingLead.name,
            company: req.body.company ?? existingLead.company,
            email: req.body.email ?? existingLead.email,
            phone: req.body.phone ?? existingLead.phone,
            source: req.body.source ?? existingLead.source,
            status: req.body.status ?? existingLead.status,
            notes: req.body.notes ?? existingLead.notes
        };

        const query = `
            UPDATE leads
            SET
                name = ?,
                company = ?,
                email = ?,
                phone = ?,
                source = ?,
                status = ?,
                notes = ?
            WHERE id = ?
        `;

        await db.promise().query(query, [
            updatedLead.name,
            updatedLead.company,
            updatedLead.email,
            updatedLead.phone,
            updatedLead.source,
            updatedLead.status,
            updatedLead.notes,
            id
        ]);

        res.status(200).json({
            success: true,
            message: "Lead updated successfully",
            data: updatedLead
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE LEAD
const deleteLead = async (req, res) => {
    try {

        const { id } = req.query;

        const query = `
            DELETE FROM leads
            WHERE id = ?
        `;

        const [result] = await db.promise().query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Lead deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getLeads,
    createLead,
    updateLead,
    deleteLead
};