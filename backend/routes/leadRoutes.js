const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");

const {
    getLeads,
    createLead,
    updateLead,
    deleteLead
} = require("../controllers/leadController");

router.get("/", authMiddleware, getLeads);

router.post("/", authMiddleware, createLead);

router.patch("/", authMiddleware, updateLead);

router.delete("/", authMiddleware, deleteLead);

module.exports = router;