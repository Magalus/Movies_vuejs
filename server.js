const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('short'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

var mysql  = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password : '',
    database: 'movies',
    debug: false
});

// Récupération des films et réalisateurs

app.get("/movies", (req, res) => {
	pool.getConnection((err, connection) => {
            if (err) {
                res.sendStatus(503);
                return;
            }
            const query = "SELECT m.id, m.title, m.year, m.type, m.synopsis, m.url_image, d.name, d.birth, d.nationality FROM movies m INNER JOIN directors d ON d.id = m.director_id";
            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    res.sendStatus(503);
                    return;
                }
                let movies = rows.map((row) => {
                    return {
                    	id: row.id, 
                    	title: row.title,
                    	year: row.year,
                    	type: row.type,
                    	director:{
                    		name: row.name,
                    		birth: row.birth,
                    		nationality: row.nationality
                    	},
                    	synopsis: row.synopsis,
                        url: row.url_image
                   	};
                });
                res.json(movies);
                return;
            });
        });
});

// Récupération d'un film et réalisateur en fonction de l'ID en paramètre

app.get("/movie/:id", (req, res) => {
	pool.getConnection((err, connection) => {
            if (err) {
                res.sendStatus(503);
                return;
            }
            const query = `SELECT m.id, m.title, m.year, m.type, m.synopsis, m.url_image, m.note, d.name, d.birth, d.nationality FROM movies m INNER JOIN directors d ON d.id = m.director_id WHERE m.id = ${req.params.id}`;
            connection.query(query, (err, rows) => {
         
                connection.release();
                if (err) {
                    res.sendStatus(503);
                    return;
                }
                let movie = rows.map((row) => {
                
                    return {
                    	id: row.id, 
                    	title: row.title,
                    	year: row.year,
                    	type: row.type,
                    	director:{
                    		name: row.name,
                    		birth: row.birth,
                    		nationality: row.nationality
                    	},
                    	synopsis: row.synopsis,
                        url_image: row.url_image,
                        note: row.note
                   	};
                })[0];
                res.json(movie);
                return;
            });
        });
})

// Suppression d'un film en fonction de l'ID en paramètre

app.delete("/movie/:id", (req, res) => {
    pool.getConnection((err, connection) => {
            if (err) {
                res.sendStatus(503);
                return;
            }
            query = `DELETE FROM movies WHERE id = ${req.params.id}`;
            connection.query(query, (error, rows) => {
                connection.release();
                if (error) {
                    res.sendStatus(503);
                    return;
                }
                res.sendStatus(200);
                return;
            })
    });
})


// Ajoute d'un film et réalisateur 

app.post("/form", (req, res) => {
     pool.getConnection((err, connection) => {
            if (err) {
                res.sendStatus(503);
                return;
            }
            query = `INSERT INTO directors(name, birth, nationality) VALUES ('${req.body.director.name}', '${req.body.director.birth}', '${req.body.director.nationality}')`;       
            connection.query(query, (error, rows) => {
                if (error) {
                    res.sendStatus(503);
                    return;
                }
                console.log(error);
            query = `INSERT INTO movies(title, year, type, synopsis, note, url_image, director_id) VALUES ('${req.body.title}', '${req.body.year}', '${req.body.type}', '${req.body.synopsis}', '${req.body.note}', '${req.body.url_image}', '${rows.insertId}')`;          
            connection.query(query, (error, rows) => {
                connection.release();
                if (error) {
                    res.sendStatus(503);
                    return;
                }
                console.log(error);
                res.sendStatus(200);
                return;
            })
        })
    });
})

// Mise à jour des informations d'un film 

app.put("/movie", (req, res) => {
	pool.getConnection((err, connection) => {
            if (err) {
                res.sendStatus(503);
                return;
            }
            query = `UPDATE movies SET title ="${req.body.title}", year ="${req.body.year}", type="${req.body.type}", synopsis ="${req.body.synopsis}", url_image ="${req.body.url_image}", note ="${req.body.note}" WHERE id = ${req.body.id}`;
            connection.query(query, (error, rows) => {
                connection.release();
                if (error) {
                    res.sendStatus(503);
                    return;
                }
                res.sendStatus(200);
                return;
            })
    });
})

app.listen(3000, () => {
    console.log('Node server is running on port 3000');
});