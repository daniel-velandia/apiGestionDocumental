import { connection } from "../../db/connection.js";

const create = async (documentType) => {
    const db = await connection.clientDB();
    const query = "INSERT INTO documents_types (type) VALUES(?)";
    const [result] = await db.query(query, [documentType]);
    db.release();

    return result.insertId;
}

const read = async () => {
    const db = await connection.clientDB();
    const query = "SELECT * FROM documents_types";
    const [rows] = await db.query(query);
    db.release();

    return rows;
}

const searchById = async (documentTypeId) => {
    const db = await connection.clientDB();
    const query = "SELECT * FROM documents_types WHERE id = ?";
    const [rows] = await db.query(query, [documentTypeId]);
    db.release();

    return rows[0] || null;
}

const isEmpty = async () => {
    const db = await connection.clientDB();
    const [result] = await db.query(`SELECT COUNT(*) as count FROM documents_types`);
    db.release();

    return result[0].count === 0;
}

export default { create, read, searchById, isEmpty };
