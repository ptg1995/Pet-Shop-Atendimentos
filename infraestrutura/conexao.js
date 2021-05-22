const postgres = require('pg');

const conexao = new postgres.Pool({
    host:'localhost',
    port: '5432',
    user: 'postgres',
    password: 'postgres',
    database: 'PROJETO_ESTUFA_DB'
});

module.exports = conexao;