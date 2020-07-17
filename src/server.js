const express = require("express")
const server = express()

// Receber banco de dados
const db = require('./database/db')

// Permitir uso da pasta "public"
server.use(express.static('public'))

// Habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

// Possibilitar o uso de js dentro do html (Template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

//#region Criar rotas
server.get('/', (req, res) => {
    return res.render('index.html')
})
server.get('/create-point', (req, res) => {

    return res.render('create-point.html')

})
// Ao finalizar cadastro
server.post('/savepoint', (req, res) => {

    //#region Inserir dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);`
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro de cadastro!")
        }
        console.log("Cadastrado com sucesso!")
        console.log(this)

        return res.render('create-point.html', { saved: true })
    }
    db.run(query, values, afterInsertData)
    //#endregion Inserir dados
})
// Pesquisar pontos de coleta
server.get('/search', (req, res) => {

    const city = req.query.city

    if (city == "" || city == null) {
        db.all(`SELECT * FROM places`, function (err, rows) {
            if (err) {
                return console.log(err)
            }

            const total = rows.length

            return res.render('search-results.html', { places: rows, total: total })

        })
    } else {
        db.all(`SELECT * FROM places WHERE city LIKE '%${city}%'`, function (err, rows) {
            if (err) {
                return console.log(err)
            }

            const total = rows.length

            return res.render('search-results.html', { places: rows, total: total })

        })
    }
})
server.get('/admin', (req, res) => {

    const excluir = req.query.excluir
    
    if (excluir != null) {
        //#region Deletar dados
        db.run(`DELETE FROM places WHERE id = ?`, [excluir], function (err) {
            if (err) {
                return console.log(err)
            }
            console.log(`Registro ${excluir} deletado com sucesso`)
        })
        //#endregion Deletar dados
    }
    console.log("Excluido: " + excluir)

    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const data = rows

        return res.render('admin.html', { data })
    })
    
})
//#endregion Criar rotas

// Liberando porta
server.listen(3000)