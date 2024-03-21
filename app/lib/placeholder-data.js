// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Admin',
    username: 'admin',
    password: '123456',
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    nombre: 'Juanito',
    apellido_paterno: 'Perez',
    apellido_materno: 'Perez',
    fecha_nacimiento: '2000-09-07'
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442b',
    nombre: 'Pablito',
    apellido_paterno: 'Perez',
    apellido_materno: 'Juarez',
    fecha_nacimiento: '2000-09-07'
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442c',
    nombre: 'Pedrito',
    apellido_paterno: 'Perez',
    apellido_materno: 'Gonzalez',
    fecha_nacimiento: '2000-09-07'
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442d',
    nombre: 'Pepito',
    apellido_paterno: 'Perez',
    apellido_materno: 'Suarez',
    fecha_nacimiento: '2000-09-07'
  },
];

const salidas = [
  {
    interno_id: customers[0].id,
    date: '2024-12-06',
  },
  {
    interno_id: customers[1].id,
    date: '2024-12-06',
  },
];

const entradas = [
  {
    interno_id: customers[0].id,
    date: '2024-12-06',
  },
  {
    interno_id: customers[1].id,
    date: '2024-12-06',
  },
];

module.exports = {
  users,
  customers,
  entradas,
  salidas,
};
