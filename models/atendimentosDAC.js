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
                res.status(201).json(content);
            }
        });
    }
}
module.exports = Atendimento;