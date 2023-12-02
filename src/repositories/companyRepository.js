import { connection } from "../db/connection.js";

const create = async (company, entityId) => {
    const db = await connection.clientDB();
    const query = "INSERT INTO companies (nit, addressee_name, entity_id) VALUES(?, ?, ?)";
    const [result] = await db.query(query, [company.nit, company.addresseeName, entityId]);
    db.release();

    return result.insertId;
}

const read = async (userId) => {
    const db = await connection.clientDB();
    const query = `
        SELECT
            e.*,
            c.nit,
            c.addressee_name
        FROM companies c
        JOIN entities e ON c.entity_id = e.id
        WHERE e.user_id = ?
    `;
    const [rows] = await db.query(query, [userId]);
    db.release();

    return rows;
}

const searchById = async (companyId, userId) => {
    const db = await connection.clientDB();
    const query = `
        SELECT
            c.id,
            e.entity_id,
            e.name,
            e.email,
            e.phone,
            e.user_id,
            et.type,
            c.nit,
            c.addressee_name
        FROM companies c
        JOIN entities e ON c.entity_id = e.id
        JOIN entities_types et ON e.entity_type_id = et.id
        WHERE e.entity_id = ?
        AND
        e.user_id = ?
    `;
    const [rows] = await db.query(query, [companyId, userId]);
    db.release();

    return rows[0] || null;
}

const edit = async (company) => {
    const db = await connection.clientDB();
    const query = "UPDATE companies SET nit = ?, addressee_name = ? WHERE id = ?";
    await db.query(query, [company.nit, company.addressee_name, company.id]);
    db.release();
}

export default { create, read, searchById, edit };
