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
exports.UserController = void 0;
const tsyringe_1 = require("tsyringe");
const GenericController_1 = require("./GenericController");
const UserService_1 = require("../services/implementations/UserService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
let UserController = class UserController extends GenericController_1.GenericController {
    constructor(userService) {
        super(userService);
        this.userService = userService;
        this.handleLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({ message: "Email and password are required" });
                }
                const user = yield this.userService.findByEmail(email);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                const match = yield bcrypt.compare(password, user.password);
                if (!match) {
                    return res.status(400).json({ message: "Invalid password" });
                }
                if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
                    throw new Error("ACCESS_TOKEN_SECRET or REFRESH_TOKEN_SECRET is not defined");
                }
                const accessToken = jwt.sign({ email: user.email, id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
                const refreshToken = jwt.sign({ email: user.email, id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "2d" });
                const updatedUser = Object.assign(Object.assign({}, user), { refreshToken, password: undefined });
                yield this.userService.update(user.id, updatedUser);
                return res.status(200).json({ accessToken, refreshToken });
            }
            catch (error) {
                console.error("Login error:", error);
                return res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UserService")),
    __metadata("design:paramtypes", [UserService_1.UserService])
], UserController);
