const express = require("express");
const router = express.Router();

const apiCtrl = require("../controllers/api-ctrl");
const asyncMiddleware = require("../utils/asyncMiddleware");

router.get("/*", asyncMiddleware(apiCtrl.handleAPICall));

module.exports = router;
