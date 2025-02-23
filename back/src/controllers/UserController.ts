import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { GenericController } from "./GenericController";
import { IUserService } from "../interfaces/IUserService";
import { User } from "@prisma/client";
import { UserService } from "../services/UserService";

@injectable()
export class UserController extends GenericController<User> {
  constructor(@inject("UserService") private readonly userService: UserService) {
    super(userService);
  }
}
