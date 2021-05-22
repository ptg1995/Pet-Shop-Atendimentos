module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        return res.send('Voce está na rota de atendimentos /GET');
    });
    app.post('/atendimentos', (req, res) => {
        console.log(req.body)
        return res.end(JSON.stringify(req.body))
    })
}