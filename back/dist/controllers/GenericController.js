"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericController = void 0;
const tsyringe_1 = require("tsyringe");
let GenericController = class GenericController {
    constructor(service) {
        this.service = service;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield this.service.getAll();
                return res.json(items);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const item = yield this.service.getById(id);
                if (!item)
                    return res.status(404).json({ message: "Item não encontrado" });
                return res.json(item);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newItem = yield this.service.create(req.body);
                return res.status(201).json(newItem);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedItem = yield this.service.update(id, req.body);
                if (!updatedItem)
                    return res.status(404).json({ message: "Item não encontrado" });
                return res.json(updatedItem);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.service.delete(id);
                return res.status(204).send();
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
};
exports.GenericController = GenericController;
exports.GenericController = GenericController = __decorate([
    __param(0, (0, tsyringe_1.inject)('GenericService')),
    __metadata("design:paramtypes", [Object])
], GenericController);
