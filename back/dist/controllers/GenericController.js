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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericController = void 0;
const tsyringe_1 = require("tsyringe");
const class_transformer_1 = require("class-transformer");
const winston_logger_1 = __importDefault(require("../config/winston_logger"));
const auditoria_entity_1 = require("../models/auditoria.entity");
let GenericController = class GenericController {
    constructor(service, entityClass, createDtoClass, updateDtoClass, readDtoClass, auditoriaService) {
        this.service = service;
        this.entityClass = entityClass;
        this.createDtoClass = createDtoClass;
        this.updateDtoClass = updateDtoClass;
        this.readDtoClass = readDtoClass;
        this.auditoriaService = auditoriaService;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
            const includeRelations = req.query.includeRelations === 'true';
            const items = yield this.service.getAll(includeRelations);
            const readDtos = (0, class_transformer_1.plainToInstance)(this.readDtoClass, items);
            return res.json(readDtos);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
            let { id } = req.params;
            const includeRelations = req.query.includeRelations === 'true';
            //Verificar se TEntity é UsuarioEntity, se não for, converte id para number
            const isUsuarioEntity = this.entityClass.name === "UserEntity";
            let itemId;
            if (!isUsuarioEntity) {
                itemId = Number(id);
            }
            else {
                itemId = id;
            }
            const item = yield this.service.getById(itemId, includeRelations);
            if (!item)
                return res.status(404).json({ message: "Item não encontrado" });
            const readDto = (0, class_transformer_1.plainToInstance)(this.readDtoClass, item);
            return res.json(readDto);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(403).json({ message: "Você não tem permissão para criar um item" });
            }
            const bodyDto = (0, class_transformer_1.plainToInstance)(this.entityClass, req.body);
            const newItem = yield this.service.create(bodyDto);
            const readDto = (0, class_transformer_1.plainToInstance)(this.readDtoClass, newItem);
            if (userId)
                yield winston_logger_1.default.info(`Na tabela ${this.entityClass.name} foi criado por ${userId}, com os dados: ${JSON.stringify(bodyDto)}`);
            let auditoria = new auditoria_entity_1.AuditoriaEntity();
            auditoria.id_usuario = userId;
            auditoria.data_hora = new Date();
            auditoria.acao = "CREATE";
            auditoria.tabela = this.entityClass.name;
            auditoria.dados_anteriores = null;
            auditoria.dados_novos = JSON.stringify(newItem);
            yield this.auditoriaService.create(auditoria);
            return res.status(201).json(readDto);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
            let { id } = req.params;
            //Verificar se TEntity é UsuarioEntity, se nao for, converte id para number
            const isUsuarioEntity = this.entityClass.name === "UserEntity";
            let itemId;
            if (!isUsuarioEntity) {
                itemId = Number(id);
            }
            else {
                itemId = id;
            }
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(403).json({ message: "Você não tem permissão para atualizar um item" });
            }
            const previousItemData = yield this.service.getById(itemId);
            if (!previousItemData)
                return res.status(404).json({ message: "Item não encontrado" });
            const updateDto = (0, class_transformer_1.plainToInstance)(this.entityClass, req.body);
            const updatedItem = yield this.service.update(itemId, updateDto);
            if (!updatedItem)
                return res.status(404).json({ message: "Item não encontrado" });
            const readDto = (0, class_transformer_1.plainToInstance)(this.readDtoClass, updatedItem);
            if (userId)
                yield winston_logger_1.default.info(`Na tabela ${this.entityClass.name} o id ${itemId} foi atualizado por ${userId}, com os dados: ${JSON.stringify(updateDto)}`);
            let auditoria = new auditoria_entity_1.AuditoriaEntity();
            auditoria.id_usuario = userId;
            auditoria.data_hora = new Date();
            auditoria.acao = "UPDATE";
            auditoria.tabela = this.entityClass.name;
            auditoria.dados_anteriores = JSON.stringify(previousItemData);
            auditoria.dados_novos = JSON.stringify(updatedItem);
            yield this.auditoriaService.create(auditoria);
            return res.json(readDto);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
            let { id } = req.params;
            //Verificar se TEntity é UsuarioEntity, se nao for, converte id para number
            const isUsuarioEntity = this.entityClass.name === "UserEntity";
            let itemId;
            if (!isUsuarioEntity) {
                itemId = Number(id);
            }
            else {
                itemId = id;
            }
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(403).json({ message: "Você não tem permissão para atualizar um item" });
            }
            if (userId === id) {
                return res.status(403).json({ message: "Você não pode excluir a si mesmo" });
            }
            const item = yield this.service.getById(itemId);
            if (!item)
                return res.status(404).json({ message: "Item não encontrado" });
            yield this.service.delete(itemId);
            yield winston_logger_1.default.info(`Na tabela ${this.entityClass.name} o id ${itemId} foi excluído por ${userId}`);
            let auditoria = new auditoria_entity_1.AuditoriaEntity();
            auditoria.id_usuario = userId;
            auditoria.data_hora = new Date();
            auditoria.acao = "DELETE";
            auditoria.tabela = this.entityClass.name;
            auditoria.dados_anteriores = JSON.stringify(item);
            auditoria.dados_novos = null;
            yield this.auditoriaService.create(auditoria);
            return res.status(204).send();
        });
    }
};
exports.GenericController = GenericController;
exports.GenericController = GenericController = __decorate([
    __param(0, (0, tsyringe_1.inject)('GenericService')),
    __param(5, (0, tsyringe_1.inject)('AuditoriaService')),
    __metadata("design:paramtypes", [Object, Function, Function, Function, Function, Object])
], GenericController);
/*

    
    id_auditoria!: number;
    
    id_usuario!: string;
    
    data_hora!: Date;
    
    acao!: string;
    
    tabela!: string;
    
    dados_anteriores!: string | null;
    
    dados_novos!: string | null;*/ 
