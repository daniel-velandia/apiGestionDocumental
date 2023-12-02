import { connection } from "../db/connection.js";

const create = async (entityId, personId, dependenceId) => {
    const db = await connection.clientDB();
    const query = "INSERT INTO functionaries (entity_id, person_id, dependence_id) VALUES(?, ?, ?)";
    await db.query(query, [entityId, personId, dependenceId]);
    db.release();
}

const read = async (userId) => {
    const db = await connection.clientDB();
    const query = `
        SELECT
            f.id,
            f.person_id,
            e.entity_id,
            e.name,
            e.email,
            e.phone,
            e.user_id,
            e.entity_type_id,
            p.id_card,
            p.last_name,
            d.dependence
        FROM functionaries f
        JOIN entities e ON f.entity_id = e.id
        JOIN persons p ON f.person_id = p.id
        JOIN dependencies d ON f.dependence_id = d.id
        WHERE e.user_id = ?
    `;
    const [rows] = await db.query(query, [userId]);
    db.release();

    return rows;
}

const searchById = async (entityId, userId) => {
    const db = await connection.clientDB();
    const query = `
        SELECT
            f.id,
            f.person_id,
            e.entity_id,
            e.name,
            e.email,
            e.phone,
            e.user_id,
            et.type,
            p.id_card,
            p.last_name,
            d.dependence
        FROM functionaries f
        JOIN entities e ON f.entity_id = e.id
        JOIN persons p ON f.person_id = p.id
        JOIN dependencies d ON f.dependence_id = d.id
        JOIN entities_types et ON e.entity_type_id = et.id
        WHERE e.entity_id = ?
        AND
        e.user_id = ?
    `;
    const [rows] = await db.query(query, [entityId, userId]);
    db.release();

    return rows[0] || null;
}

const edit = async (funcionary) => {
    const db = await connection.clientDB();
    const query = "UPDATE functionaries SET dependence_id = ? WHERE id = ?";
    await db.query(query, [funcionary.dependence_id, funcionary.id]);
    db.release();
}

export default { create, read, searchById, edit };
