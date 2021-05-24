const Atendimento = require('../models/atendimentosDAC');
const AtendimentosDac = require('../models/atendimentosDAC')
const dac = new Atendimento();
module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        dac.SelectConsultas(res);
    });
    app.get('/atendimentos/:cliente', (req, res) => {
        dac.SelectConsultasByName(req.params['cliente'],res);
    })
    app.post('/atendimentos', (req, res) => {
        dac.InsertAtendimentos(req.body, res);
    });
    app.patch('/atendimentos/:cliente', (req, res)=>{
        dac.UpDateByName(req.params['cliente'],req.body,res)
    });
    app.delete('/atendimentos/:cliente', (req,res)=>{
        dac.DeleteByName(req.params['cliente'], res)
    })
}