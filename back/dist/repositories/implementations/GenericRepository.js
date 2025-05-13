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
exports.GenericRepository = void 0;
const tsyringe_1 = require("tsyringe");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const prismaErrorHandler_1 = require("../../utils/prismaErrorHandler");
let GenericRepository = class GenericRepository {
    constructor(prisma, model, entityClass, availableRelations = [] // Renomeado para availableRelations
    ) {
        this.prisma = prisma;
        this.model = model;
        this.entityClass = entityClass;
        this.availableRelations = availableRelations;
    }
    // Método auxiliar para gerar o include a partir das relações disponíveis
    generateInclude() {
        return this.availableRelations.reduce((acc, relation) => {
            acc[relation] = true;
            return acc;
        }, {});
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.model) {
                    throw new Error("Model is not initialized. Ensure the model is correctly set in the repository.");
                }
                const result = yield this.model.create({ data });
                return (0, class_transformer_1.plainToInstance)(this.entityClass, result);
            }
            catch (error) {
                throw (0, prismaErrorHandler_1.handlePrismaError)(error);
            }
        });
    }
    findAll() {
        return __awaiter(this, arguments, void 0, function* (includeRelations = true) {
            try {
                if (!this.model) {
                    throw new Error("Model is not initialized. Ensure the model is correctly set in the repository.");
                }
                const include = includeRelations ? this.generateInclude() : undefined;
                const results = yield this.model.findMany({ include });
                return (0, class_transformer_1.plainToInstance)(this.entityClass, results);
            }
            catch (error) {
                throw (0, prismaErrorHandler_1.handlePrismaError)(error);
            }
        });
    }
    findById(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, includeRelations = true) {
            try {
                const include = includeRelations ? this.generateInclude() : undefined;
                const result = yield this.model.findUnique({
                    where: { id },
                    include,
                });
                return result ? (0, class_transformer_1.plainToInstance)(this.entityClass, result) : null;
            }
            catch (error) {
                throw (0, prismaErrorHandler_1.handlePrismaError)(error);
            }
        });
    }
    findByField(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.findFirst({ where: { [field]: value } });
                return result ? (0, class_transformer_1.plainToInstance)(this.entityClass, result) : null;
            }
            catch (error) {
                throw (0, prismaErrorHandler_1.handlePrismaError)(error);
            }
        });
    }
    findManyByQuery(query_1) {
        return __awaiter(this, arguments, void 0, function* (query, includeRelations = true) {
            try {
                const include = includeRelations ? this.generateInclude() : undefined;
                const results = yield this.model.findMany(Object.assign(Object.assign({}, query), { include }));
                return (0, class_transformer_1.plainToInstance)(this.entityClass, results);
            }
            catch (error) {
                throw (0, prismaErrorHandler_1.handlePrismaError)(error);
            }
        });
    }
    findManyByField(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield this.model.findMany({ where: { [field]: value } });
                return (0, class_transformer_1.plainToInstance)(this.entityClass, results);
            }
            catch (error) {
                throw (0, prismaErrorHandler_1.handlePrismaError)(error);
            }
        });
    }
    findByFields(fields_1) {
        return __awaiter(this, arguments, void 0, function* (fields, includeRelations = true) {
            try {
                const whereClause = fields.reduce((acc, { field, value }) => {
                    acc[field] = value; // Directly assign the value as provided by the user
                    return acc;
                }, {});
                const include = includeRelations ? this.generateInclude() : undefined;
                const result = yield this.model.findFirst({ where: whereClause, include });
                return result ? (0, class_transformer_1.plainToInstance)(this.entityClass, result) : null;
            }
            catch (error) {
                throw (0, prismaErrorHandler_1.handlePrismaError)(error);
            }
        });
    }
    findManyByFields(fields_1) {
        return __awaiter(this, arguments, void 0, function* (fields, includeRelations = true) {
            try {
                const whereClause = fields.reduce((acc, { field, value }) => {
                    acc[field] = value; // Directly assign the value as provided by the user
                    return acc;
                }, {});
                const include = includeRelations ? this.generateInclude() : undefined;
                const results = yield this.model.findMany({ where: whereClause, include });
                return (0, class_transformer_1.plainToInstance)(this.entityClass, results);
            }
            catch (error) {
                throw (0, prismaErrorHandler_1.handlePrismaError)(error);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.findById(id);
                if (!entity)
                    return null;
                const result = yield this.model.update({ where: { id: id }, data });
                return (0, class_transformer_1.plainToInstance)(this.entityClass, result);
            }
            catch (error) {
                throw (0, prismaErrorHandler_1.handlePrismaError)(error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.model.delete({ where: { id } });
            }
            catch (error) {
                throw (0, prismaErrorHandler_1.handlePrismaError)(error);
            }
        });
    }
};
exports.GenericRepository = GenericRepository;
exports.GenericRepository = GenericRepository = __decorate([
    (0, tsyringe_1.registry)([
        {
            token: "GenericRepository",
            useClass: GenericRepository,
        },
    ]),
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("PrismaClient")),
    __metadata("design:paramtypes", [client_1.PrismaClient, Object, Function, Array])
], GenericRepository);
