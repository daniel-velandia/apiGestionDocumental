import { connection } from "../../../db/connection.js";

const create = async (company) => {
    const db = await connection.clientDB();
    try {
        db.beginTransaction();

        const {interlocutorId, name, email, phone, userDbId, interlocutorTypeDbId, nit, addresseeName} = company;

        const interlocutorQ = "INSERT INTO interlocutors (interlocutor_id, name, email, phone, user_db_id, interlocutor_type_db_id) VALUES(?, ?, ?, ?, ?, ?)";
        const companyQ = "INSERT INTO companies (nit, addressee_name, interlocutor_db_id) VALUES(?, ?, ?)";

        const [interlocutorRows] = await db.query(interlocutorQ, [interlocutorId, name, email, phone, userDbId, interlocutorTypeDbId]);
        await db.query(companyQ, [nit, addresseeName, interlocutorRows.insertId]);

        db.commit();
    } catch (error) {
        db.rollback();
        throw error;
    } finally {
        db.release();
    }
}

const read = async (userDbId) => {
    const db = await connection.clientDB();
    try {
        const query = `
        SELECT
            i.interlocutor_id,
            c.nit,
            c.addressee_name,
            i.name,
            i.email,
            i.phone
        FROM companies c
        JOIN interlocutors i ON c.interlocutor_db_id = i.id
        WHERE i.user_db_id = ?
        `;
        const [rows] = await db.query(query, [userDbId]);
        
        return rows;
    } catch (error) {
        throw error;
    } finally {
        db.release();
    }
}

const searchById = async (interlocutorId, userDbId) => {
    const db = await connection.clientDB();
    try {
        const query = `
        SELECT
            c.id,
            c.interlocutor_db_id,
            i.interlocutor_id,
            i.name,
            i.email,
            i.phone,
            c.nit,
            c.addressee_name,
            it.name AS type
        FROM companies c
        JOIN interlocutors i ON c.interlocutor_db_id = i.id
        JOIN interlocutors_types it ON i.interlocutor_type_db_id = it.id
        WHERE i.interlocutor_id = ?
        AND
        e.user_db_id = ?
    `;
    const [rows] = await db.query(query, [interlocutorId, userDbId]);

    return rows[0] || null;
    } catch (error) {
        throw error;
    } finally {
        db.release();
    }
}

const edit = async (company) => {
    const db = await connection.clientDB();
    try {
        db.beginTransaction();

        const {id, interlocutorDbId, name, email, phone, nit, addresseeName} = company;
        
        const interlocutorQ = "UPDATE interlocutors SET name = ?, email = ?, phone = ? WHERE id = ?";
        const companyQ = "UPDATE companies SET nit = ?, addressee_name = ? WHERE id = ?";

        await db.query(interlocutorQ, [name, email, phone, interlocutorDbId]);
        await db.query(companyQ, [nit, addresseeName, id]);

        db.commit();
    } catch (error) {
        db.rollback();
        throw error;
    } finally {
        db.release();
    }
}

const remove = async (company) => {
    const db = await connection.clientDB();
    try {
        const interlocutorQ = "DELETE FROM interlocutors WHERE id = ?";
        await db.query(interlocutorQ, [company.interlocutorDbId]);
    } catch (error) {
        throw error;
    } finally {
        db.release();
    }
}

export default { create, read, searchById, edit, remove };
