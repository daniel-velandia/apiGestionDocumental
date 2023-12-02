import { connection } from "../../db/connection.js";

const create = async (file) => {
    const db = await connection.clientDB();
    const query = "INSERT INTO files (file) VALUES (?)";
    const [result] = await db.query(query, [file]);
    db.release();

    return result.insertId;
}

const searchById = async (fileId) => {
    const db = await connection.clientDB();
    const query = "SELECT * FROM files WHERE id = ?";
    const [rows] = await db.query(query, [fileId]);
    db.release();

    return rows[0] || null;
}

const edit = async (file, fileId) => {
    const db = await connection.clientDB();
    const query = "UPDATE files SET file = ? WHERE id = ?";
    await db.query(query, [file, fileId]);
    db.release();
}

const remove = async (fileId) => {
    const db = await connection.clientDB();
    const query = "DELETE FROM files WHERE id = ?";
    await db.query(query, [fileId]);
    db.release();
}

export default { create, searchById, edit, remove };
