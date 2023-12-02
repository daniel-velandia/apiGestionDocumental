import mysql from "mysql2/promise";
import { variables } from "../utils/variables.js";

const pool = mysql.createPool({
    host: variables.MYSQL_HOST,
    port: variables.MYSQL_PORT,
    user: variables.MYSQL_USER,
    password: variables.MYSQL_PASSWORD,
    database: variables.MYSQL_DB
});

const connection = {
    clientDB: async () => {
        try {
            
            const connection = await pool.getConnection();
            console.log("Conexion con DB exitosa");
            connection.release();

            return connection;

        } catch (error) {
            console.log("Error al conectar DB: " + error);
            throw error;
        }
    }
}

export { connection };