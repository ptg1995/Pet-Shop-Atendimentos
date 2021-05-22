class Tabelas{
    init(conexao){
        this.conexao = conexao;
    }
    CriarAtendimentos(){
        const tabelaDoesExists = (err)=>{
            let sql = (`select * from 'public'.'atendimentos'`);
            if(err){ 
                return true;
            }
        }
        if(tabelaDoesExists){
            let sql = (`CREATE TABLE atendimentos (`)
                .concat(`idc_registro integer NOT NULL DEFAULT nextval('res_estufa_idc_registro_seq'::regclass),`)
                .concat('cliente VARCHAR(50) NOT NULL,')
                .concat('pet varchar(20),')
                .concat('servico varchar(20) NOT NULL, ')
                .concat('status varchar(20) NOT NULL,')
                .concat('observacoes varchar(500),')
                .concat(' PRIMARY KEY(idc_registro))');
            this.conexao.query(sql, (err)=>{
                if(err){
                    console.log(err);
                }
                else {
                    console.log('Tabela atendimentos criada com sucesso')
                }
            })
        }
        else{
            console.log('Tabela já existe!')
        }
    }
};
module.exports = new Tabelas;