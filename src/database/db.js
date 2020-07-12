const sqlite3 = require('sqlite3').verbose()

// Criar banco de dados
const db = new sqlite3.Database('./src/database/database.db')

// Exportar db para usar em outros arquivos
module.exports = db

// Gerenciar banco de dados
db.serialize(() => {
    //#region Criar uma tabela 
    /* db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `) */
    //#endregion Criar uma tabela

    //#region Inserir dados
    /* const query = `
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
        "https://blog.brkambiental.com.br/wp-content/uploads/2019/07/original-b742306ee3cd42b3c57b1a4b986bcb0c.jpg",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]
    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso!")
        console.log(this)
    }
    db.run(query, values, afterInsertData) */
    //#endregion Inserir dados

    //#region Buscar dados
    /* db.all(`SELECT * FROM places`, function(err, rows){
        if(err) {
            return console.log(err)
        }
        console.log("Aqui estão seus registros")
        console.log(rows)
    }) */
    //#endregion Buscar dados

    //#region Deletar dados
    // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err){
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log("Registro deletado com sucesso")
    // })
    //#endregion Deletar dados
})