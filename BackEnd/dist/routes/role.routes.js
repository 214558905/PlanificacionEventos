"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_controllers_1 = require("../controllers/roles.controllers");
const router = (0, express_1.Router)();
router.get('/getRols', roles_controllers_1.getAllRols);
exports.default = router;
