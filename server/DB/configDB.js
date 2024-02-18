
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'sql6.freemysqlhosting.net',
    port: '3306',
    user: 'sql6684982',
    password: 'ITMcpiDKLC',
    database: 'sql6684982',
});
const configDB = async () => {


    db.connect((err) => {
        if (err) {
            console.error('Failed to connect to the database', err);
            return;
        }
        const query1 = `DROP TABLE IF EXISTS favourite`;

        db.query(query1, (err, result) => {
            if (err) {
                console.error('Failed to drop table', err);
                return;
            }
        });
        const query2 = `CREATE TABLE IF NOT EXISTS favourite (
            id int NOT NULL AUTO_INCREMENT, 
            quoteId VARCHAR(50) NOT NULL,
            PRIMARY KEY(id)
        ) `;

        db.query(query2, (err, result) => {
            if (err) {
                console.error('Failed to create table', err);
                return;
            }
        });
    });
}

module.exports = configDB;