const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const tabelas = require('./infraestrutura/tabelas')
const  app = customExpress();

conexao.connect((err) => {
    if(!err){
        tabelas.init(conexao);
        tabelas.CriarTabelaAtendimentos();
        console.log('Conectado ao banco de dados com  sucesso!')
    }
    else{
        console.log(err);
    }
});
app.listen(3000, ()=>console.log('Servidor na porta 3000'));