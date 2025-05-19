"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeProfiles = void 0;
const core_1 = require("@automapper/core");
const mapper_1 = require("./mapper");
const user_entity_1 = require("../models/user.entity");
const ReadUser_dto_1 = require("../Dtos/User/ReadUser.dto");
const CreateUser_dto_1 = require("../Dtos/User/CreateUser.dto");
const UpdateUser_dto_1 = require("../Dtos/User/UpdateUser.dto");
const consulta_entity_1 = require("../models/consulta.entity");
const ReadConsultaDto_1 = require("../Dtos/Consulta/ReadConsultaDto");
const CreateConsultaDto_1 = require("../Dtos/Consulta/CreateConsultaDto");
const agendamento_entity_1 = require("../models/agendamento.entity");
const CreateAgendamentoDto_1 = require("../Dtos/Agendamento/CreateAgendamentoDto");
const ReadAgendamentoDto_1 = require("../Dtos/Agendamento/ReadAgendamentoDto");
const UpdateAgendamentoDto_1 = require("../Dtos/Agendamento/UpdateAgendamentoDto");
const paciente_entity_1 = require("../models/paciente.entity");
const CreatePacienteDto_1 = require("../Dtos/Paciente/CreatePacienteDto");
const ReadPacienteDto_1 = require("../Dtos/Paciente/ReadPacienteDto");
const UpdatePacienteDto_1 = require("../Dtos/Paciente/UpdatePacienteDto");
const anamnese_entity_1 = require("../models/anamnese.entity");
const ReadAnamneseDto_1 = require("../Dtos/Anamnese/ReadAnamneseDto");
const UpdateConsultaDto_1 = require("../Dtos/Consulta/UpdateConsultaDto");
const UpdateAnamneseDto_1 = require("../Dtos/Anamnese/UpdateAnamneseDto");
const conduta_entity_1 = require("../models/conduta.entity");
const ReadCondutaDto_1 = require("../Dtos/Conduta/ReadCondutaDto");
const CreateCondutaDto_1 = require("../Dtos/Conduta/CreateCondutaDto");
const UpdateCondutaDto_1 = require("../Dtos/Conduta/UpdateCondutaDto");
const CreateAnamneseDto_1 = require("../Dtos/Anamnese/CreateAnamneseDto");
const initializeProfiles = () => {
    // User mappings
    (0, core_1.createMap)(mapper_1.mapper, user_entity_1.UserEntity, ReadUser_dto_1.ReadUserDto);
    (0, core_1.createMap)(mapper_1.mapper, ReadUser_dto_1.ReadUserDto, user_entity_1.UserEntity);
    (0, core_1.createMap)(mapper_1.mapper, user_entity_1.UserEntity, CreateUser_dto_1.CreateUserDto);
    (0, core_1.createMap)(mapper_1.mapper, CreateUser_dto_1.CreateUserDto, user_entity_1.UserEntity);
    (0, core_1.createMap)(mapper_1.mapper, user_entity_1.UserEntity, UpdateUser_dto_1.UpdateUserDto);
    (0, core_1.createMap)(mapper_1.mapper, UpdateUser_dto_1.UpdateUserDto, user_entity_1.UserEntity);
    // Consulta mappings
    (0, core_1.createMap)(mapper_1.mapper, consulta_entity_1.ConsultaEntity, ReadConsultaDto_1.ReadConsultaDto);
    (0, core_1.createMap)(mapper_1.mapper, ReadConsultaDto_1.ReadConsultaDto, consulta_entity_1.ConsultaEntity);
    (0, core_1.createMap)(mapper_1.mapper, consulta_entity_1.ConsultaEntity, CreateConsultaDto_1.CreateConsultaDto);
    (0, core_1.createMap)(mapper_1.mapper, CreateConsultaDto_1.CreateConsultaDto, consulta_entity_1.ConsultaEntity);
    (0, core_1.createMap)(mapper_1.mapper, consulta_entity_1.ConsultaEntity, UpdateConsultaDto_1.UpdateConsultaDto);
    (0, core_1.createMap)(mapper_1.mapper, UpdateConsultaDto_1.UpdateConsultaDto, consulta_entity_1.ConsultaEntity);
    // Agendamento mappings
    (0, core_1.createMap)(mapper_1.mapper, agendamento_entity_1.AgendamentoEntity, ReadAgendamentoDto_1.ReadAgendamentoDto);
    (0, core_1.createMap)(mapper_1.mapper, ReadAgendamentoDto_1.ReadAgendamentoDto, agendamento_entity_1.AgendamentoEntity);
    (0, core_1.createMap)(mapper_1.mapper, agendamento_entity_1.AgendamentoEntity, CreateAgendamentoDto_1.CreateAgendamentoDto);
    (0, core_1.createMap)(mapper_1.mapper, CreateAgendamentoDto_1.CreateAgendamentoDto, agendamento_entity_1.AgendamentoEntity);
    (0, core_1.createMap)(mapper_1.mapper, agendamento_entity_1.AgendamentoEntity, UpdateAgendamentoDto_1.UpdateAgendamentoDto);
    (0, core_1.createMap)(mapper_1.mapper, UpdateAgendamentoDto_1.UpdateAgendamentoDto, agendamento_entity_1.AgendamentoEntity);
    // Paciente mappings
    (0, core_1.createMap)(mapper_1.mapper, paciente_entity_1.PacienteEntity, ReadPacienteDto_1.ReadPacienteDto);
    (0, core_1.createMap)(mapper_1.mapper, ReadPacienteDto_1.ReadPacienteDto, paciente_entity_1.PacienteEntity);
    (0, core_1.createMap)(mapper_1.mapper, paciente_entity_1.PacienteEntity, CreatePacienteDto_1.CreatePacienteDto);
    (0, core_1.createMap)(mapper_1.mapper, CreatePacienteDto_1.CreatePacienteDto, paciente_entity_1.PacienteEntity);
    (0, core_1.createMap)(mapper_1.mapper, paciente_entity_1.PacienteEntity, UpdatePacienteDto_1.UpdatePacienteDto);
    (0, core_1.createMap)(mapper_1.mapper, UpdatePacienteDto_1.UpdatePacienteDto, paciente_entity_1.PacienteEntity);
    // Anamnese mappings
    (0, core_1.createMap)(mapper_1.mapper, anamnese_entity_1.AnamneseEntity, ReadAnamneseDto_1.ReadAnamneseDto);
    (0, core_1.createMap)(mapper_1.mapper, ReadAnamneseDto_1.ReadAnamneseDto, anamnese_entity_1.AnamneseEntity);
    (0, core_1.createMap)(mapper_1.mapper, anamnese_entity_1.AnamneseEntity, CreateAnamneseDto_1.CreateAnamneseDto);
    (0, core_1.createMap)(mapper_1.mapper, CreateAnamneseDto_1.CreateAnamneseDto, anamnese_entity_1.AnamneseEntity);
    (0, core_1.createMap)(mapper_1.mapper, anamnese_entity_1.AnamneseEntity, UpdateAnamneseDto_1.UpdateAnamneseDto);
    (0, core_1.createMap)(mapper_1.mapper, UpdateAnamneseDto_1.UpdateAnamneseDto, anamnese_entity_1.AnamneseEntity);
    // Conduta mappings
    (0, core_1.createMap)(mapper_1.mapper, conduta_entity_1.CondutaEntity, ReadCondutaDto_1.ReadCondutaDto);
    (0, core_1.createMap)(mapper_1.mapper, ReadCondutaDto_1.ReadCondutaDto, conduta_entity_1.CondutaEntity);
    (0, core_1.createMap)(mapper_1.mapper, conduta_entity_1.CondutaEntity, CreateCondutaDto_1.CreateCondutaDto);
    (0, core_1.createMap)(mapper_1.mapper, CreateCondutaDto_1.CreateCondutaDto, conduta_entity_1.CondutaEntity);
    (0, core_1.createMap)(mapper_1.mapper, conduta_entity_1.CondutaEntity, UpdateCondutaDto_1.UpdateCondutaDto);
    (0, core_1.createMap)(mapper_1.mapper, UpdateCondutaDto_1.UpdateCondutaDto, conduta_entity_1.CondutaEntity);
};
exports.initializeProfiles = initializeProfiles;
