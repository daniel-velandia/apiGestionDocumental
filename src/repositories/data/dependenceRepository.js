import { connection } from "../../db/connection.js";

const create = async (dependence) => {
    const db = await connection.clientDB();
    try {
        const query = "INSERT INTO dependencies (name) VALUES(?)";
        await db.query(query, dependence);
    } catch(error) {
        throw error;
    } finally {
        db.release();
    }
}

const read = async () => {
    const db = await connection.clientDB();
    try {
        const query = "SELECT * FROM dependencies";
        const [rows] = await db.query(query);
    
        return rows;
    } catch(error) {
        throw error;
    } finally {
        db.release();
    }
}

const searchById = async (id) => {
    const db = await connection.clientDB();
    try {
        const query = "SELECT * FROM dependencies WHERE id = ?";
        const [rows] = await db.query(query, [id]);
    
        return rows[0] || null;
    } catch(error) {
        throw error;
    } finally {
        db.release();
    }
}

const isEmpty = async () => {
    const db = await connection.clientDB();
    try {
        const query = "SELECT COUNT(*) as count FROM dependencies";
        const [result] = await db.query(query);
    
        return result[0].count == 0;
    } catch(error) {
        throw error;
    } finally {
        db.release();
    }
}

export default { create, read, searchById, isEmpty };