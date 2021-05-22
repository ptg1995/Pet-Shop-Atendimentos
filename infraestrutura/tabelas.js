class Tabelas{
    init(conexao){
        this.conexao = conexao;
    }
    CriarAtendimentos(){
        const tabelaExists = ()=>{
            let sql = (`select *  from 'public'.'atendimentos'`);
            if(sql){ 
                return true;
            }
        }
        if(!tabelaExists){
            let sql = (`CREATE TABLE atendimentos (idc_registro integer NOT NULL DEFAULT nextval('res_estufa_idc_registro_seq'::regclass),`
                .concat('cliente VARCHAR(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL,')
                .concat('observacoes varchar(500), PRIMARY KEY(idc_registro))'))
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