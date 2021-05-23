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
        console.log(req.body)
        dac.InsertAtendimentos(req.body, res);
    });
}