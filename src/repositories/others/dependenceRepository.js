import { connection } from "../../db/connection.js";

const create = async (dependence) => {
    const db = await connection.clientDB();
    const query = "INSERT INTO dependencies (dependence) VALUES(?)";
    const [result] = await db.query(query, [dependence]);
    db.release();

    return result.insertId;
}

const read = async () => {
    const db = await connection.clientDB();
    const query = "SELECT * FROM dependencies";
    const [rows] = await db.query(query);
    db.release();

    return rows;
}

const searchById = async (dependenceId) => {
    const db = await connection.clientDB();
    const query = "SELECT * FROM dependencies WHERE id = ?";
    const [rows] = await db.query(query, [dependenceId]);
    db.release();

    return rows[0] || null;
}

const isEmpty = async () => {
    const db = await connection.clientDB();
    const [result] = await db.query(`SELECT COUNT(*) as count FROM dependencies`);

    return result[0].count == 0;
}

export default { create, read, searchById, isEmpty };
