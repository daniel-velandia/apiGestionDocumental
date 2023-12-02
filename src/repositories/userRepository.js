import { connection } from "../db/connection.js"

const create = async (user) => {
    const db = await connection.clientDB();
    const query = "INSERT INTO users (user_id, username, email, encrypted_password) VALUES(?, ?, ?, ?)";
    await db.query(query, [user.userId, user.username, user.email, user.encryptedPassword]);
    db.release();
}

const searchByUsername = async (username) => {
    const db = await connection.clientDB();
    const query = "SELECT * FROM users WHERE username = ?";
    const [rows] = await db.query(query, [username]);
    db.release();

    return rows[0] || null;
}

const searchByEmail = async (email) => {
    const db = await connection.clientDB();
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.query(query, [email]);
    db.release();

    return rows[0] || null;
}

export default { create, searchByUsername, searchByEmail };