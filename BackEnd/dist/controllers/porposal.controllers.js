"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = exports.generarCronograma = exports.editPorposal = exports.getAllPorposals = exports.getHorarioPorposal = exports.getParticipansPorposal = exports.getPorposalbyId = exports.getAllPorposalbyId = exports.createProposal = exports.deletePorposalById = exports.updatefileId = void 0;
const proposalEvent_1 = __importDefault(require("../models/proposalEvent"));
const participantsE_1 = __importDefault(require("../models/participantsE"));
const files_1 = __importDefault(require("../models/files"));
const events_1 = __importDefault(require("../models/events"));
const horario_1 = __importDefault(require("../models/horario"));
const fileEsquema_1 = __importDefault(require("../models/fileEsquema"));
const fileFacilitador_1 = __importDefault(require("../models/fileFacilitador"));
const sequelize_1 = require("sequelize");
const careers_1 = __importDefault(require("../models/careers"));
const updatefileId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { porposalId } = req.params;
        const { fileId, fileEsquemaId } = req.body;
        const porposal = yield proposalEvent_1.default.findByPk(porposalId);
        if (porposal && fileId) {
            yield porposal.update({
                fileId
            });
        }
        else if (porposal && fileEsquemaId) {
            yield porposal.update({
                fileEsquemaId
            });
        }
        res.status(200).json({ message: 'OK' });
    }
    catch (error) {
        res.status(400).json({ message: 'Ups no se pudo editar la Propuesta', error });
    }
});
exports.updatefileId = updatefileId;
const deletePorposalById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { porposalId } = req.params;
        const porposal = yield proposalEvent_1.default.findByPk(porposalId);
        if (!porposal) {
            res.status(400).json({ message: 'No existe la Propuesta' });
        }
        yield (porposal === null || porposal === void 0 ? void 0 : porposal.destroy());
        res.status(200).json({ message: 'La propuesta ha sido eliminada' });
    }
    catch (error) {
        res.status(400).json({ message: '!Error', error });
    }
});
exports.deletePorposalById = deletePorposalById;
const createProposal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nameEvent, titleEvent, provincia, canton, sector, institution, dateFinEvent, linkZoom, instroduction, justification, goals, generalObjective, specificObjective, objectivePublic, guests, dateEvent, contentEvent, duration, activitiesEvent, name, datePresentation, idUser, careerId, facultyId, eventId, participants, horario, costo, dirigidoA, habilidades, descriptionEvent, metodologiaE, evaluacion, facilitador, state } = req.body;
        const fileFacilitador = yield fileFacilitador_1.default.findOne({
            where: { idUser: idUser }
        });
        const fileFacilitadorId = fileFacilitador === null || fileFacilitador === void 0 ? void 0 : fileFacilitador.fileFacilitadorId;
        const proposal = yield proposalEvent_1.default.create({
            nameEvent,
            titleEvent,
            provincia,
            canton,
            sector,
            institution,
            dateFinEvent,
            linkZoom,
            instroduction,
            justification,
            goals,
            generalObjective,
            specificObjective,
            objectivePublic,
            guests,
            dateEvent,
            contentEvent,
            duration,
            activitiesEvent,
            name,
            datePresentation,
            idUser,
            careerId,
            facultyId,
            eventId,
            costo,
            dirigidoA,
            habilidades,
            descriptionEvent,
            metodologiaE,
            evaluacion,
            facilitador,
            fileFacilitadorId,
            state
        });
        proposal.save();
        yield createHorario(horario, proposal.porposalId);
        yield createParticipants(participants, proposal.porposalId);
        res.status(200).json(proposal.porposalId);
    }
    catch (error) {
        console.error('Error al crear la propuesta:', error);
        res.status(500).json({ error: 'Error al crear la propuesta' });
    }
});
exports.createProposal = createProposal;
const getAllPorposalbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUser } = req.params;
        const porposals = yield proposalEvent_1.default.findAll({
            order: [['updatedAt', 'DESC']],
            where: { idUser },
            include: [{
                    model: files_1.default,
                },
                {
                    model: fileEsquema_1.default,
                },
                {
                    model: events_1.default,
                    as: 'evento',
                    attributes: ['name'],
                }
            ]
        });
        res.status(200).json(porposals);
    }
    catch (error) {
        res.status(400).json({ message: 'Ups! Ocurrio un Error', error });
    }
});
exports.getAllPorposalbyId = getAllPorposalbyId;
const getPorposalbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { porposalId } = req.params;
        const porposal = yield proposalEvent_1.default.findByPk(porposalId, {
            include: [{
                    model: files_1.default,
                },
                {
                    model: fileEsquema_1.default,
                },
                {
                    model: fileFacilitador_1.default,
                },
            ]
        });
        res.status(200).json(porposal);
    }
    catch (error) {
        res.status(400).json({ message: 'Ups Ocurrio un error', error });
    }
});
exports.getPorposalbyId = getPorposalbyId;
const getParticipansPorposal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { porposalId } = req.params;
        const participants = yield participantsE_1.default.findAll({ where: { porposalId: porposalId } });
        res.status(200).json(participants);
    }
    catch (error) {
        res.status(400).json({ message: 'Ups Ocurrio un error', error });
    }
});
exports.getParticipansPorposal = getParticipansPorposal;
const getHorarioPorposal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { porposalId } = req.params;
        const horario = yield horario_1.default.findAll({ where: { porposalId: porposalId } });
        res.status(200).json(horario);
    }
    catch (error) {
        res.status(400).json({ message: 'Ups Ocurrio un error', error });
    }
});
exports.getHorarioPorposal = getHorarioPorposal;
const getAllPorposals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const porposals = yield proposalEvent_1.default.findAll({
            order: [['updatedAt', 'DESC']],
            include: [{
                    model: files_1.default,
                },
                {
                    model: fileEsquema_1.default,
                },
                {
                    model: fileFacilitador_1.default,
                },
                {
                    model: events_1.default,
                    as: 'evento',
                    attributes: ['name'],
                }
            ]
        });
        res.status(200).json(porposals);
    }
    catch (error) {
        res.status(400).json({ message: 'Ups Ocurrio un error', error });
    }
});
exports.getAllPorposals = getAllPorposals;
const editPorposal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { porposalId } = req.params;
        const { nameEvent, titleEvent, provincia, canton, sector, institution, dateFinEvent, linkZoom, instroduction, justification, goals, generalObjective, specificObjective, objectivePublic, guests, dateEvent, contentEvent, duration, activitiesEvent, name, datePresentation, idUser, careerId, facultyId, eventId, participants, horario, costo, dirigidoA, habilidades, descriptionEvent, metodologiaE, evaluacion, facilitador, state } = req.body;
        yield horario_1.default.destroy({
            where: {
                porposalId: porposalId
            }
        });
        yield participantsE_1.default.destroy({
            where: {
                porposalId: porposalId
            }
        });
        const porposal = yield proposalEvent_1.default.findByPk(porposalId);
        console.log(porposal);
        if (porposal) {
            yield porposal.update({
                nameEvent,
                titleEvent,
                provincia,
                canton,
                sector,
                institution,
                dateFinEvent,
                linkZoom,
                instroduction,
                justification,
                goals,
                generalObjective,
                specificObjective,
                objectivePublic,
                guests,
                dateEvent,
                contentEvent,
                duration,
                activitiesEvent,
                name,
                datePresentation,
                idUser,
                careerId,
                facultyId,
                eventId,
                costo,
                dirigidoA,
                habilidades,
                descriptionEvent,
                metodologiaE,
                evaluacion,
                facilitador,
                state
            });
            yield createHorario(horario, porposalId);
            yield createParticipants(participants, porposalId);
            res.status(200).json({ message: 'Propuesta editada correctamente correctamente' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Ups no se pudo editar la Propuesta', error });
    }
});
exports.editPorposal = editPorposal;
const createParticipants = (participants, idPorposal) => __awaiter(void 0, void 0, void 0, function* () {
    for (const participant of participants) {
        yield participantsE_1.default.create({
            name: participant.name,
            activities: participant.activities,
            porposalId: idPorposal,
            position: participant.position
        });
    }
});
const generarCronograma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fechaInicio, fechaFin } = req.body;
        console.log(req.body);
        const porposals = yield proposalEvent_1.default.findAll({
            order: [['dateEvent', 'ASC']],
            where: {
                datePresentation: {
                    [sequelize_1.Op.between]: [fechaInicio, fechaFin]
                },
                state: 'Aprobado'
            },
            include: [
                {
                    model: careers_1.default,
                    as: 'careerP',
                    attributes: ['name'],
                },
                {
                    model: events_1.default,
                    as: 'evento',
                    attributes: ['name'],
                }
            ]
        });
        res.status(200).json(porposals);
    }
    catch (error) {
        res.status(400).json({ message: '!Ups ocurrio un error', error });
    }
});
exports.generarCronograma = generarCronograma;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { porposalId } = req.params;
        const { state, comment } = req.body;
        const porposalFound = yield proposalEvent_1.default.findByPk(porposalId);
        if (!porposalFound) {
            res.status(400).json({ message: 'Propuesta no encontrada' });
        }
        else {
            yield porposalFound.update({
                state,
                comment
            });
            res.status(200).json({ message: 'Propuesta editada' });
        }
    }
    catch (error) {
    }
});
exports.addComment = addComment;
const createHorario = (horarios, idPorposal) => __awaiter(void 0, void 0, void 0, function* () {
    if (horarios) {
        for (const horario of horarios) {
            yield horario_1.default.create({
                porposalId: idPorposal,
                diaSemana: horario.diaSemana,
                horaInicio: horario.horaInicio,
                horaFin: horario.horaFin,
            });
        }
    }
});
