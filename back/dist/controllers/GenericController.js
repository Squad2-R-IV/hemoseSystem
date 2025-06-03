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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericController = void 0;
const tsyringe_1 = require("tsyringe");
const class_transformer_1 = require("class-transformer");
const winston_logger_1 = __importDefault(require("../config/winston_logger"));
let GenericController = class GenericController {
    constructor(service, createDtoClass, updateDtoClass, readDtoClass, auditoriaService, tableName // Explicitly pass the table name
    ) {
        this.service = service;
        this.createDtoClass = createDtoClass;
        this.updateDtoClass = updateDtoClass;
        this.readDtoClass = readDtoClass;
        this.auditoriaService = auditoriaService;
        this.tableName = tableName; // Use the provided table name
    }
    async getAll(req, res) {
        // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
        const includeRelations = req.query.includeRelations === 'true';
        const items = await this.service.getAll(includeRelations);
        const readDtos = (0, class_transformer_1.plainToInstance)(this.readDtoClass, items);
        return res.json(readDtos);
    }
    async getById(req, res) {
        // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
        const itemId = isNaN(Number(req.params.id)) ? req.params.id : Number(req.params.id);
        const item = await this.service.getById(itemId, req.query.includeRelations === 'true');
        if (!item) {
            return res.status(404).json({ message: "Item não encontrado" });
        }
        const readDto = (0, class_transformer_1.plainToInstance)(this.readDtoClass, item);
        return res.json(readDto);
    }
    async create(req, res) {
        // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
        const userId = req.user?.id;
        if (!userId) {
            return res.status(403).json({ message: "Você não tem permissão para criar um item" });
        }
        const bodyDto = req.body;
        const newItem = await this.service.create(bodyDto);
        const readDto = (0, class_transformer_1.plainToInstance)(this.readDtoClass, newItem);
        if (req.user?.id) {
            await winston_logger_1.default.info(`Na tabela foi criado por ${req.user.id}, com os dados: ${JSON.stringify(bodyDto)}`);
        }
        const auditoria = {
            id_usuario: req.user?.id || '',
            data_hora: new Date(),
            acao: "CREATE",
            tabela: this.tableName,
            dados_anteriores: null,
            dados_novos: JSON.stringify(newItem),
        };
        await this.auditoriaService.create(auditoria);
        return res.status(201).json(readDto);
    }
    async update(req, res) {
        // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
        const { id } = req.params;
        const itemId = isNaN(Number(id)) ? id : Number(id);
        const userId = req.user?.id;
        if (!userId) {
            return res.status(403).json({ message: "Você não tem permissão para atualizar um item" });
        }
        const previousItemData = await this.service.getById(itemId);
        if (!previousItemData) {
            return res.status(404).json({ message: "Item não encontrado" });
        }
        const updateDto = req.body;
        const updatedItem = await this.service.update(itemId, updateDto);
        const readDto = (0, class_transformer_1.plainToInstance)(this.readDtoClass, updatedItem);
        if (req.user?.id) {
            await winston_logger_1.default.info(`Na tabela o id ${itemId} foi atualizado por ${req.user.id}, com os dados: ${JSON.stringify(updateDto)}`);
        }
        const auditoria = {
            id_usuario: req.user?.id || '',
            data_hora: new Date(),
            acao: "UPDATE",
            tabela: this.tableName,
            dados_anteriores: JSON.stringify(previousItemData),
            dados_novos: JSON.stringify(updatedItem),
        };
        await this.auditoriaService.create(auditoria);
        return res.json(readDto);
    }
    async delete(req, res) {
        // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
        const { id } = req.params;
        const itemId = isNaN(Number(id)) ? id : Number(id);
        const userId = req.user?.id;
        if (!userId) {
            return res.status(403).json({ message: "Você não tem permissão para atualizar um item" });
        }
        if (userId === id) {
            return res.status(403).json({ message: "Você não pode excluir a si mesmo" });
        }
        const item = await this.service.getById(itemId);
        if (!item) {
            return res.status(404).json({ message: "Item não encontrado" });
        }
        await this.service.delete(itemId);
        if (req.user?.id) {
            await winston_logger_1.default.info(`Na tabela o id ${itemId} foi excluído por ${req.user.id}`);
        }
        const auditoria = {
            id_usuario: req.user?.id || '',
            data_hora: new Date(),
            acao: "DELETE",
            tabela: this.tableName,
            dados_anteriores: JSON.stringify(item),
            dados_novos: null,
        };
        await this.auditoriaService.create(auditoria);
        return res.status(204).send();
    }
};
exports.GenericController = GenericController;
exports.GenericController = GenericController = __decorate([
    __param(0, (0, tsyringe_1.inject)('GenericService')),
    __param(4, (0, tsyringe_1.inject)('AuditoriaService')),
    __metadata("design:paramtypes", [Object, Function, Function, Function, Object, String])
], GenericController);
//# sourceMappingURL=GenericController.js.map