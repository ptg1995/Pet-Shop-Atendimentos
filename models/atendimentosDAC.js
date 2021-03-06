const conexao = require('../infraestrutura/conexao')
const moment = require('moment');
const { response } = require('express');

class Atendimento{
    InsertAtendimentos(atendimento, res){
        const dataCriacao = new Date();
        const dataCriacaoFormat = moment(dataCriacao.getTime()).format('YYYY-MM-DD HH:mm:ss')
        const  dataAtendimentoFormat = moment(atendimento.dataAtendimento, 'DD-MM-YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
        //valida data do atendimento
        if(dataAtendimentoFormat<= dataCriacaoFormat ){
            return res.status(400).send('A data da consulta deve ser maior que a data atual.')
        }
        //valida nome completo
        if(atendimento.nome.length < 5){
            return res.status(400).send('Nome deve ser completo!')
        }
        const sql = (`INSERT INTO public.atendimentos (`)
            .concat(`cliente, pet, servico, status, observacoes, dth_consulta, dth_marcacao) `)
            .concat(`VALUES ( '${atendimento.nome}', '${atendimento.pet}',`)
            .concat(`'${atendimento.servico}', '${atendimento.status}', '${atendimento.observacoes}', '${dataAtendimentoFormat}', '${dataCriacaoFormat}')`);
        conexao.query(sql,(err, content) =>{ 
            if(err) {
                res.status(400).json(err)
            }
            else{
                res.status(201).json({...atendimento});
            }
        });
    };
    SelectConsultas( res){
        const sql = (`Select cliente, pet, servico, observacoes, to_char(dth_consulta, 'YYYY-MM-DD HH24:mm:ss') as dth_consulta, to_char(dth_marcacao, 'YYYY-MM-DD HH24:mm:ss') as dth_marcacao from public.atendimentos`) 
        conexao.query(sql,(err, content) =>{ 
            if(err) {
                res.status(400).json(err)
            }
            else{
                res.status(201).json(content.rows);
            }
        });
    };
    SelectConsultasByName(cliente,res){
        console.log(cliente)
        const sql = (`Select cliente, pet, servico, observacoes, to_char(dth_consulta, 'YYYY-MM-DD HH24:mm:ss') as dth_consulta, to_char(dth_marcacao, 'YYYY-MM-DD HH24:mm:ss') as dth_marcacao from public.atendimentos WHERE cliente = '${cliente}'`) // or pet = '${req.params.pet}' or  dth_consulta = ${req.params.dataAtendimento}`)    
        conexao.query(sql,(err, content) =>{ 
            if(err) {
                res.status(400).json(err)
            }
            else{
                res.status(201).json(content.rows[0]);
            }
        });
    };
    UpDateByName(cliente, valores, res){
        const dataCriacao = new Date();
        const dataCriacaoFormat = moment(dataCriacao.getTime()).format('YYYY-MM-DD HH:mm:ss');
        const  dataAtendimentoFormat = moment(valores.dataAtendimento, 'DD-MM-YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
        console.log(dataCriacaoFormat)
        const sql = (`UPDATE public.atendimentos SET cliente='${cliente}', pet='${valores.pet}', servico='${valores.servico}', status='${valores.status}', observacoes='${valores.observacoes}', dth_consulta='${dataAtendimentoFormat}', dth_marcacao='${dataCriacaoFormat}' WHERE cliente = '${cliente}'`)    
        conexao.query(sql,(err, content) =>{ 
            if(err) {
                res.status(400).json(err);
            }
            else{
                res.status(201).json({...valores, cliente});
            }
        });
    }
    DeleteByName(cliente, res){
        const sql = (`DELETE FROM public.atendimentos WHERE cliente='${cliente}'`)    
        conexao.query(sql,(err, content) =>{ 
            if(err) {
                res.status(400).json(err);
            }
            else{
                res.status(200).send(`Consulta do(a) cliente ${cliente} foi desmarcada!`);
            }
        });
    }
}
module.exports = Atendimento;