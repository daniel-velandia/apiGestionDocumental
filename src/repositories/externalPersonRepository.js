import { connection } from "../db/connection.js";

const create = async (address, entityId, personId) => {
    const db = await connection.clientDB();
    const query = "INSERT INTO external_persons (address, entity_id, person_id) VALUES(?, ?, ?)";
    const [result] = await db.query(query, [address, entityId, personId]);
    db.release();

    return result.insertId;
}

const read = async (userId) => {
    const db = await connection.clientDB();
    const query = `
        SELECT
            ep.id,
            ep.person_id,
            e.entity_id,
            e.name,
            e.email,
            e.phone,
            e.user_id,
            e.entity_type_id,
            ep.address,
            p.id_card,
            p.last_name
        FROM external_persons ep
        JOIN entities e ON ep.entity_id = e.id
        JOIN persons p ON ep.person_id = p.id
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
            ep.id,
            ep.person_id,
            e.entity_id,
            e.name,
            e.email,
            e.phone,
            e.user_id,
            et.type,
            ep.address,
            p.id_card,
            p.last_name
        FROM external_persons ep
        JOIN entities e ON ep.entity_id = e.id
        JOIN persons p ON ep.person_id = p.id
        JOIN entities_types et ON e.entity_type_id = et.id
        WHERE e.entity_id = ?
        AND
        e.user_id = ?
    `;
    const [rows] = await db.query(query, [entityId, userId]);
    db.release();

    return rows[0] || null;
}

const edit = async (externalPerson) => {
    const db = await connection.clientDB();
    const query = "UPDATE external_persons SET address = ? WHERE id = ?";
    await db.query(query, [externalPerson.address, externalPerson.id]);
    db.release();
}

export default { create, read, searchById, edit };
