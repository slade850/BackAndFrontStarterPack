import db from "../../config/database";

//init table user if not exist;
const initUserTable = () => {
    let sqlQuery = 'CREATE TABLE IF NOT EXISTS users(id VARCHAR(100) PRIMARY KEY NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, pseudo VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, role ENUM("user", "admin") NOT NULL)';
    return db.query(sqlQuery, (err, result) => {
        err ? console.log(err) : console.log("users Table ready");
    });
};

initUserTable();

// Our query is performed on the database and the data is sent back to the service.
const Query = {
    register: (user) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO users (id, email, pseudo, password, role) VALUES ("${user.id}", "${user.email}", "${user.pseudo}", "${user.hashedPassword}", "user")`;
            //role ="user", role is added as a default for the Enum in the database
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    login: (userLogin) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM users WHERE email = "${userLogin}" OR pseudo = "${userLogin}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    getUser: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM users WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}

export default Query;