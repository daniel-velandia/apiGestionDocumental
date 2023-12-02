import { connection } from "../../db/connection.js"

const create = async (entity, entityTypeId) => {
    const db = await connection.clientDB();
    const query = "INSERT INTO entities (entity_id, name, email, phone, user_id, entity_type_id) VALUES(?, ?, ?, ?, ?, ?)";
    const [result] = await db.query(query, [entity.entityId, entity.name, entity.email, entity.phone, entity.userId, entityTypeId]);
    db.release();

    return result.insertId;
}

const searchById = async (entityId, userId) => {
    const db = await connection.clientDB();
    const query = `
        SELECT 
            e.*,
            et.type
        FROM entities e 
        JOIN entities_types et ON e.entity_type_id = et.id 
        WHERE e.entity_id = ?
        AND
        e.user_id = ?
    `;
    const [rows] = await db.query(query, [entityId, userId]);
    db.release();

    return rows[0] || null;
}

const edit = async (entity) => {
    const db = await connection.clientDB();
    const query = "UPDATE entities SET name = ?, email = ?, phone = ? WHERE entity_id = ?";
    await db.query(query, [entity.name, entity.email, entity.phone, entity.entity_id]);
    db.release();
}

const remove = async (entityId) => {
    const db = await connection.clientDB();
    const query = "DELETE FROM entities WHERE entity_id = ?";
    await db.query(query, [entityId]);
    db.release();
}

export default { create, searchById, edit, remove };