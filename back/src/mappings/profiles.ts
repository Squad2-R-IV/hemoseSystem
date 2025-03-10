import { createMap } from '@automapper/core';
import { mapper } from './mapper';
import { UserEntity } from '../models/user.entity';
import { ReadUserDto } from '../Dtos/User/ReadUser.dto';
import { CreateUserDto } from '../Dtos/User/CreateUser.dto';
import { UpdateUserDto } from '../Dtos/User/UpdateUser.dto';
import { HistoricoEntity } from '../models/historico.entity';
import { ReadHistoricoDto } from '../Dtos/Historico/ReadHistoricoDto';
import { CreateHistoricoDto } from '../Dtos/Historico/CreateHistoricoDto';
import { AgendamentoEntity } from '../models/agendamento.entity';
import { CreateAgendamentoDto } from '../Dtos/Agendamento/CreateAgendamentoDto';
import { ReadAgendamentoDto } from '../Dtos/Agendamento/ReadAgendamentoDto';
import { UpdateAgendamentoDto } from '../Dtos/Agendamento/UpdateAgendamentoDto';
import { PacienteEntity } from '../models/paciente.entity';
import { CreatePacienteDto } from '../Dtos/Paciente/CreatePacienteDto';
import { ReadPacienteDto } from '../Dtos/Paciente/ReadPacienteDto';
import { UpdatePacienteDto } from '../Dtos/Paciente/UpdatePacienteDto';


export const initializeProfiles = () => {

    createMap(mapper, UserEntity, ReadUserDto);
    createMap(mapper, ReadUserDto, UserEntity);
    
    createMap(mapper, UserEntity, CreateUserDto);
    createMap(mapper, CreateUserDto, UserEntity);

    createMap(mapper, UserEntity, UpdateUserDto);
    createMap(mapper, UpdateUserDto, UserEntity);

    createMap(mapper, HistoricoEntity, ReadHistoricoDto);
    createMap(mapper, ReadHistoricoDto, HistoricoEntity);

    createMap(mapper, HistoricoEntity, CreateHistoricoDto);
    createMap(mapper, CreateHistoricoDto, HistoricoEntity);

    createMap(mapper, HistoricoEntity, ReadHistoricoDto);
    createMap(mapper, ReadHistoricoDto, HistoricoEntity);

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
}