import { createMap } from '@automapper/core';
import { mapper } from './mapper';
import { UserEntity } from '../models/user.entity';
import { ReadUserDto } from '../Dtos/User/ReadUser.dto';
import { CreateUserDto } from '../Dtos/User/CreateUser.dto';
import { UpdateUserDto } from '../Dtos/User/UpdateUser.dto';
import { ConsultaEntity } from '../models/consulta.entity';
import { ReadConsultaDto } from '../Dtos/Consulta/ReadConsultaDto';
import { CreateConsultaDto } from '../Dtos/Consulta/CreateConsultaDto';
import { AgendamentoEntity } from '../models/agendamento.entity';
import { CreateAgendamentoDto } from '../Dtos/Agendamento/CreateAgendamentoDto';
import { ReadAgendamentoDto } from '../Dtos/Agendamento/ReadAgendamentoDto';
import { UpdateAgendamentoDto } from '../Dtos/Agendamento/UpdateAgendamentoDto';
import { PacienteEntity } from '../models/paciente.entity';
import { CreatePacienteDto } from '../Dtos/Paciente/CreatePacienteDto';
import { ReadPacienteDto } from '../Dtos/Paciente/ReadPacienteDto';
import { UpdatePacienteDto } from '../Dtos/Paciente/UpdatePacienteDto';
import { AnamneseEntity } from '../models/anamnese.entity';
import { ReadAnamneseDto } from '../Dtos/Anamnese/ReadAnamneseDto';
import { UpdateConsultaDto } from '../Dtos/Consulta/UpdateConsultaDto';

export const initializeProfiles = () => {
    createMap(mapper, UserEntity, ReadUserDto);
    createMap(mapper, ReadUserDto, UserEntity);

    createMap(mapper, UserEntity, CreateUserDto);
    createMap(mapper, CreateUserDto, UserEntity);

    createMap(mapper, UserEntity, UpdateUserDto);
    createMap(mapper, UpdateUserDto, UserEntity);

    createMap(mapper, ConsultaEntity, ReadConsultaDto);
    createMap(mapper, ReadConsultaDto, ConsultaEntity);

    createMap(mapper, ConsultaEntity, CreateConsultaDto);
    createMap(mapper, CreateConsultaDto, ConsultaEntity);

    createMap(mapper, ConsultaEntity, UpdateConsultaDto);
    createMap(mapper, UpdateConsultaDto, ConsultaEntity);

    createMap(mapper, AgendamentoEntity, ReadAgendamentoDto);
    createMap(mapper, ReadAgendamentoDto, AgendamentoEntity);

    createMap(mapper, AgendamentoEntity, CreateAgendamentoDto);
    createMap(mapper, CreateAgendamentoDto, AgendamentoEntity);

    createMap(mapper, AgendamentoEntity, UpdateAgendamentoDto);
    createMap(mapper, UpdateAgendamentoDto, AgendamentoEntity);

    createMap(mapper, PacienteEntity, ReadPacienteDto);
    createMap(mapper, ReadPacienteDto, PacienteEntity);

    createMap(mapper, PacienteEntity, CreatePacienteDto);
    createMap(mapper, CreatePacienteDto, PacienteEntity);

    createMap(mapper, PacienteEntity, UpdatePacienteDto);
    createMap(mapper, UpdatePacienteDto, PacienteEntity);

    createMap(mapper, AnamneseEntity, ReadAnamneseDto);
    createMap(mapper, ReadAnamneseDto, AnamneseEntity);
}