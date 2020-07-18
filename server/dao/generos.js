import conn from "../lib/connectiondb.js";

const getAll = () => {
    const query = "SELECT * FROM genero";
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, results) => {
            if(err) return reject(err);

            resolve(results);
        });
    });
};

export default {getAll};
