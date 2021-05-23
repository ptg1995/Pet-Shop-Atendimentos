const Atendimento = require('../models/atendimentosDAC');
const AtendimentosDac = require('../models/atendimentosDAC')
const dac = new Atendimento();
module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        return res.send('Voce está na rota de atendimentos /GET');
    });
    app.post('/atendimentos', (req, res) => {
        console.log(req.body)
        dac.InsertAtendimentos(req.body, res);
        //console.log(res);
       // return res.end(JSON.stringify('Atendimento agendado com sucesso!',req.body))
    })
}