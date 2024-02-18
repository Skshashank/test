const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'sql6.freemysqlhosting.net',
    port: '3306',
    user: 'sql6684982',
    password: 'ITMcpiDKLC',
    database: 'sql6684982',
});


addToFav = async (req, res, next) => {

    const quoteId = req.params.id;
    if (quoteId == null) {
        res.status(400).json({ message: "no id found" });
        return;
    }
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            res.status(500).json({ error: 'Failed to connect to the database' });
            return;
        }

        const query = 'INSERT INTO favourite (quoteId) VALUES (?)';
        const values = [quoteId.toString()];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error saving the favourite quote:', err);
                res.status(500).json({ error: 'Failed to save the favourite quote' });
                return;
            }

            res.json({ success: true });
        });
    });
}

getFav = async (req, res, next) => {
    let favorites = null;
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            res.status(500).json({ error: 'Failed to connect to the database' });
            return;
        }

        const query = 'SELECT quoteId FROM favourite';

        db.query(query, (err, result) => {
            if (err) {
                console.error('Error fetching the favourite quotes:', err);
                res.status(500).json({ error: 'Failed to fetch the favourite quotes' });
                return;
            }

            favorites = result;
            let list = [];
            if (favorites) {
                for (let i in favorites) {
                    list.push(favorites[i].quoteId);
                }
            }
            res.json(list);
        });

    });

}

removeFav = async (req, res, next) => {
    const id = req.params.id;
    if (id == null) {
        res.status(400).json({ message: "no id found" });
        return;
    }
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            res.status(500).json({ error: 'Failed to connect to the database' });
            return;
        }

        let _id = id.toString();
        const query = `DELETE FROM favourite WHERE favourite.quoteId = '${_id}'`;

        db.query(query, (err, result) => {
            if (err) {
                console.error('Error fetching the favourite quotes:', err);
                res.status(500).json({ error: 'Failed to fetch the favourite quotes' });
                return;
            }

            res.status(200).json({});
        });

    });

}

module.exports = {
    addToFav,
    getFav
};