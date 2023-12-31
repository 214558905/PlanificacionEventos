"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_controller_1 = require("../controllers/events.controller");
const autorization_1 = require("../middlewares/autorization");
const router = (0, express_1.Router)();
router.get('/getAllEvents', events_controller_1.getAllEvents);
router.post('/createEvent', autorization_1.verifyToken, events_controller_1.createEvent);
router.put('/editEvent/:eventId', autorization_1.verifyToken, events_controller_1.editEventById);
exports.default = router;
