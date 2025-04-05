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
import { PrescricaoEntity } from '../models/prescricao.entity';
import { ReadPrescricaoDto } from '../Dtos/Prescricao/ReadPrescricaoDto';
import { CreatePrescricaoDto } from '../Dtos/Prescricao/CreatePrescricaoDto';
import { UpdatePrescricaoDto } from '../Dtos/Prescricao/UpdatePrescricaoDto';
import { UpdateAnamneseDto } from '../Dtos/Anamnese/UpdateAnamneseDto';
import { CondutaEntity } from '../models/conduta.entity';
import { ReadCondutaDto } from '../Dtos/Conduta/ReadCondutaDto';
import { CreateCondutaDto } from '../Dtos/Conduta/CreateCondutaDto';
import { UpdateCondutaDto } from '../Dtos/Conduta/UpdateCondutaDto';

export const initializeProfiles = () => {
    // User mappings
    createMap(mapper, UserEntity, ReadUserDto);
    createMap(mapper, ReadUserDto, UserEntity);

    createMap(mapper, UserEntity, CreateUserDto);
    createMap(mapper, CreateUserDto, UserEntity);

    createMap(mapper, UserEntity, UpdateUserDto);
    createMap(mapper, UpdateUserDto, UserEntity);

    // Consulta mappings
    createMap(mapper, ConsultaEntity, ReadConsultaDto);
    createMap(mapper, ReadConsultaDto, ConsultaEntity);

    createMap(mapper, ConsultaEntity, CreateConsultaDto);
    createMap(mapper, CreateConsultaDto, ConsultaEntity);

    createMap(mapper, ConsultaEntity, UpdateConsultaDto);
    createMap(mapper, UpdateConsultaDto, ConsultaEntity);

    // Agendamento mappings
    createMap(mapper, AgendamentoEntity, ReadAgendamentoDto);
    createMap(mapper, ReadAgendamentoDto, AgendamentoEntity);

    createMap(mapper, AgendamentoEntity, CreateAgendamentoDto);
    createMap(mapper, CreateAgendamentoDto, AgendamentoEntity);

    createMap(mapper, AgendamentoEntity, UpdateAgendamentoDto);
    createMap(mapper, UpdateAgendamentoDto, AgendamentoEntity);

    // Paciente mappings
    createMap(mapper, PacienteEntity, ReadPacienteDto);
    createMap(mapper, ReadPacienteDto, PacienteEntity);

    createMap(mapper, PacienteEntity, CreatePacienteDto);
    createMap(mapper, CreatePacienteDto, PacienteEntity);

    createMap(mapper, PacienteEntity, UpdatePacienteDto);
    createMap(mapper, UpdatePacienteDto, PacienteEntity);

    // Anamnese mappings
    createMap(mapper, AnamneseEntity, ReadAnamneseDto);
    createMap(mapper, ReadAnamneseDto, AnamneseEntity);

    createMap(mapper, AnamneseEntity, CreateAgendamentoDto);
    createMap(mapper, CreateAgendamentoDto, AnamneseEntity);
    
    createMap(mapper, AnamneseEntity, UpdateAnamneseDto);
    createMap(mapper, UpdateAnamneseDto, AnamneseEntity);
    // Prescricao mappings
    createMap(mapper, PrescricaoEntity, ReadPrescricaoDto);
    createMap(mapper, ReadPrescricaoDto, PrescricaoEntity);

    createMap(mapper, PrescricaoEntity, CreatePrescricaoDto);
    createMap(mapper, CreatePrescricaoDto, PrescricaoEntity);

    createMap(mapper, PrescricaoEntity, UpdatePrescricaoDto);
    createMap(mapper, UpdatePrescricaoDto, PrescricaoEntity);

    // Conduta mappings
    createMap(mapper, CondutaEntity, ReadCondutaDto);
    createMap(mapper, ReadCondutaDto, CondutaEntity);

    createMap(mapper, CondutaEntity, CreateCondutaDto);
    createMap(mapper, CreateCondutaDto, CondutaEntity);

    createMap(mapper, CondutaEntity, UpdateCondutaDto);
    createMap(mapper, UpdateCondutaDto, CondutaEntity);
};
