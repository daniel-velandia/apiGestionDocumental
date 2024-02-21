import { connection } from "../../db/connection.js";

const create = async (documentType) => {
    const db = await connection.clientDB();
    try {
        const query = "INSERT INTO document_types (name) VALUES(?)";
        await db.query(query, documentType);
    } catch(error) {
        throw error;
    } finally {
        db.release();
    }
}

const read = async () => {
    const db = await connection.clientDB();
    try {
        const query = "SELECT * FROM document_types";
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
        const query = "SELECT * FROM document_types WHERE id = ?";
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
        const query = "SELECT COUNT(*) as count FROM document_types";
        const [result] = await db.query(query);
    
        return result[0].count === 0;
    } catch(error) {
        throw error;
    } finally {
        db.release();
    }
}

export default { create, read, searchById, isEmpty };