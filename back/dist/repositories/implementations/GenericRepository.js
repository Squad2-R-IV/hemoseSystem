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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericRepository = void 0;
const tsyringe_1 = require("tsyringe");
const client_1 = require("@prisma/client");
const prismaErrorHandler_1 = require("../../utils/prismaErrorHandler");
let GenericRepository = class GenericRepository {
    constructor(prisma, model, availableRelations = [] // Renamed to availableRelations
    ) {
        this.prisma = prisma;
        this.model = model;
        this.availableRelations = availableRelations;
    }
    // Helper method to generate the include object from available relations
    generateInclude() {
        return this.availableRelations.reduce((acc, relation) => {
            acc[relation] = true;
            return acc;
        }, {});
    }
    async create(data) {
        try {
            if (!this.model) {
                throw new Error("Model is not initialized. Ensure the model is correctly set in the repository.");
            }
            const result = await this.model.create({ data });
            return result;
        }
        catch (error) {
            throw (0, prismaErrorHandler_1.handlePrismaError)(error);
        }
    }
    async findAll(includeRelations = true) {
        try {
            if (!this.model) {
                throw new Error("Model is not initialized. Ensure the model is correctly set in the repository.");
            }
            const include = includeRelations ? this.generateInclude() : undefined;
            const results = await this.model.findMany({ include });
            return results;
        }
        catch (error) {
            throw (0, prismaErrorHandler_1.handlePrismaError)(error);
        }
    }
    async findById(id, includeRelations = true) {
        try {
            const include = includeRelations ? this.generateInclude() : undefined;
            const result = await this.model.findUnique({
                where: { id },
                include,
            });
            return result;
        }
        catch (error) {
            throw (0, prismaErrorHandler_1.handlePrismaError)(error);
        }
    }
    async findByField(field, value) {
        try {
            const result = await this.model.findFirst({ where: { [field]: value } });
            return result;
        }
        catch (error) {
            throw (0, prismaErrorHandler_1.handlePrismaError)(error);
        }
    }
    async findManyByQuery(query, includeRelations = true) {
        try {
            const include = includeRelations ? this.generateInclude() : undefined;
            const results = await this.model.findMany({ ...query, include });
            return results;
        }
        catch (error) {
            throw (0, prismaErrorHandler_1.handlePrismaError)(error);
        }
    }
    async findManyByField(field, value) {
        try {
            const results = await this.model.findMany({ where: { [field]: value } });
            return results;
        }
        catch (error) {
            throw (0, prismaErrorHandler_1.handlePrismaError)(error);
        }
    }
    async findByFields(fields, includeRelations = true) {
        try {
            const whereClause = fields.reduce((acc, { field, value }) => {
                acc[field] = value;
                return acc;
            }, {});
            const include = includeRelations ? this.generateInclude() : undefined;
            const result = await this.model.findFirst({ where: whereClause, include });
            return result;
        }
        catch (error) {
            throw (0, prismaErrorHandler_1.handlePrismaError)(error);
        }
    }
    async findManyByFields(fields, includeRelations = true) {
        try {
            const whereClause = fields.reduce((acc, { field, value }) => {
                acc[field] = value;
                return acc;
            }, {});
            const include = includeRelations ? this.generateInclude() : undefined;
            const results = await this.model.findMany({ where: whereClause, include });
            return results;
        }
        catch (error) {
            throw (0, prismaErrorHandler_1.handlePrismaError)(error);
        }
    }
    async update(id, data) {
        try {
            const entity = await this.findById(id);
            if (!entity) {
                return null;
            }
            const result = await this.model.update({ where: { id: id }, data });
            return result;
        }
        catch (error) {
            throw (0, prismaErrorHandler_1.handlePrismaError)(error);
        }
    }
    async delete(id) {
        try {
            await this.model.delete({ where: { id } });
        }
        catch (error) {
            throw (0, prismaErrorHandler_1.handlePrismaError)(error);
        }
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
    __metadata("design:paramtypes", [client_1.PrismaClient, Object, Array])
], GenericRepository);
//# sourceMappingURL=GenericRepository.js.map