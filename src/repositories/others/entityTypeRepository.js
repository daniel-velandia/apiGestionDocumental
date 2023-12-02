import { connection } from "../../db/connection.js"

const create = async (type) => {
    const db = await connection.clientDB();
    const query = "INSERT INTO entities_types (type) VALUES(?)";
    const [result] = await db.query(query, [type]);
    db.release();

    return result.insertId;
}

const read = async () => {
    const db = await connection.clientDB();
    const query = "SELECT * FROM entities_types";
    const [rows] = await db.query(query);
    db.release();

    return rows;
}

const searchByType = async (type) => {
    const db = await connection.clientDB();
    const query = "SELECT * FROM entities_types WHERE type = ?";
    const [rows] = await db.query(query, [type]);
    db.release();

    return rows[0] || null;
}

const isEmpty = async () => {
    const db = await connection.clientDB();
    const [result] = await db.query(`SELECT COUNT(*) as count FROM entities_types`);

    return result[0].count === 0;
}

export default { create, read, searchByType, isEmpty };