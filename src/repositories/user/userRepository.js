import { connection } from "../../db/connection.js"

const create = async (user) => {
    const db = await connection.clientDB();
    try {
        const {userId, username, email, encryptedPassword} = user;

        const query = "INSERT INTO users (user_id, username, email, encrypted_password) VALUES(?, ?, ?, ?)";
        await db.query(query, [userId, username, email, encryptedPassword]);
    } catch(error) {
        throw error;
    } finally {
        db.release();
    }
}

const searchByUsername = async (username) => {
    const db = await connection.clientDB();
    try {
        const query = "SELECT * FROM users WHERE username = ?";
        const [rows] = await db.query(query, [username]);
    
        return rows[0] || null;
    } catch(error) {
        throw error;
    } finally {
        db.release();
    }
}

const searchByEmail = async (email) => {
    const db = await connection.clientDB();
    try {
        const query = "SELECT * FROM users WHERE email = ?";
        const [rows] = await db.query(query, [email]);
    
        return rows[0] || null;
    } catch(error) {
        throw error;
    } finally {
        db.release();
    }
}

export default { create, searchByUsername, searchByEmail };