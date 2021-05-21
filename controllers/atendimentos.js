module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        return res.send('Voce está na rota de atendimentos /GET');
    })
    
    app.listen(3000, ()=>console.log('Servidor na porta 3000'));

}