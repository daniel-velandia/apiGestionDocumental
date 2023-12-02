import { connection } from "../../db/connection.js"

const create = async (career) => {
    const db = await connection.clientDB();
    const query = "INSERT INTO careers (career) VALUES(?)";
    const [result] = await db.query(query, [career]);
    db.release();

    return result.insertId;
}

const read = async () => {
    const db = await connection.clientDB();
    const query = "SELECT * FROM careers";
    const [rows] = await db.query(query);
    db.release();

    return rows;
}

const searchById = async (careerId) => {
    const db = await connection.clientDB();
    const query = "SELECT * FROM careers WHERE id = ?";
    const [rows] = await db.query(query, [careerId]);
    db.release();

    return rows[0] || null;
}

const isEmpty = async () => {
    const db = await connection.clientDB();
    const [result] = await db.query(`SELECT COUNT(*) as count FROM careers`);

    return result[0].count == 0;
}

export default { create, read, searchById, isEmpty };