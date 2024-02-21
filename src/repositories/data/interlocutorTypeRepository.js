import { connection } from "../../db/connection.js"

const create = async (entityType) => {
    const db = await connection.clientDB();
    try {
        const query = "INSERT INTO interlocutor_types (name) VALUES(?)";
        await db.query(query, entityType);
    } catch(error) {
        throw error;
    } finally {
        db.release();
    }
}

const read = async () => {
    const db = await connection.clientDB();
    try {
        const query = "SELECT * FROM interlocutor_types";
        const [rows] = await db.query(query);
    
        return rows;
    } catch(error) {
        throw error;
    } finally {
        db.release();
    }
}

const searchByName = async (name) => {
    const db = await connection.clientDB();
    try {
        const query = "SELECT * FROM interlocutor_types WHERE name = ?";
        const [rows] = await db.query(query, name);
    
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
        const query = "SELECT COUNT(*) as count FROM interlocutor_types";
        const [result] = await db.query(query);
    
        return result[0].count === 0;
    } catch(error) {
        throw error;
    } finally {
        db.release();
    }
}

export default { create, read, searchByName, isEmpty };