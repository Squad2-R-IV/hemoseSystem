import { inject, injectable, registry } from "tsyringe";
import { Role } from "@prisma/client";
import { GenericService } from "./GenericService";
import { IRoleService } from "../interfaces/IRoleService";
import { RoleRepository } from "../../repositories/implementations/RoleRepository";
import { RoleWithRelations } from "../../utils/includeTypes";

@injectable()
@registry([
  {
    token: 'RoleService',
    useClass: RoleService,
  },
])
export class RoleService extends GenericService<RoleWithRelations> implements IRoleService {
  private roleRepository: RoleRepository;

  constructor(
    @inject("RoleRepository") roleRepository: RoleRepository,
  ) {
    super(roleRepository);
    this.roleRepository = roleRepository;
  }

  async getById(id: string, includeRelations?: boolean): Promise<RoleWithRelations | null> {
    return await this.roleRepository.findById(id, includeRelations);
  }

  async getAll(includeRelations?: boolean): Promise<RoleWithRelations[]> {
    return await this.roleRepository.findAll(includeRelations);
  }

  async getRolesByUserId(userId: string): Promise<RoleWithRelations[]> {
    return await this.repository.findManyByFields([{ field: 'users', value: { some: { userId: userId } } }], true);
  }
}
