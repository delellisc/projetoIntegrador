import { DataSource } from 'typeorm';
import 'dotenv/config';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Profissional } from 'src/profissionais/entities/profissionai.entity';
import { Atendimento } from 'src/atendimentos/entities/atendimento.entity';
import { Especializacao } from 'src/especializacoes/entities/especializacoe.entity';

const db = process.env.DATABASE_NAME;
const user = process.env.DATABASE_USER;
const password = process.env.USER_PASSWORD;
const hostname = process.env.HOST_NAME;

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      console.log('Connecting to database with:');
      console.log(`Host: ${hostname}`);
      console.log(`Database: ${db}`);
      console.log(`User: ${user}`);
      console.log(`Password: ${password}`);

      const dataSource = new DataSource({
        type: 'postgres',
        host: hostname,
        port: 5432,
        username: user,
        password: password,
        database: db,
        entities: [Paciente, Profissional, Atendimento, Especializacao],
        synchronize: true, // TEMPORARILY enable for testing
      });

      return dataSource.initialize();
    },
  },
];
