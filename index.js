const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas')
const  app = customExpress();

conexao.connect((err) => {
    if(!err){
        Tabelas.init(conexao);
        Tabelas.CriarAtendimentos();
        console.log('conectado ao banco de dados com  sucesso!')
    }
    else{
        console.log(err);
    }
});
app.listen(3000, ()=>console.log('Servidor na porta 3000'));