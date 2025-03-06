import { createMap } from '@automapper/core';
import { mapper } from './mapper';
import { UserEntity } from '../models/user.entity';
import { ReadUserDto } from '../Dtos/User/ReadUser.dto';
import { CreateUserDto } from '../Dtos/User/CreateUser.dto';
import { UpdateUserDto } from '../Dtos/User/UpdateUser.dto';
import { HistoricoEntity } from '../models/historico.entity';
import { ReadHistoricoDto } from '../Dtos/Historico/ReadHistoricoDto';
import { CreateHistoricoDto } from '../Dtos/Historico/CreateHistoricoDto';


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
    
}