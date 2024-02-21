import { connection } from "../../../db/connection.js";

const create = async (funcionary) => {
    const db = await connection.clientDB();
    try {
        db.beginTransaction();
        
        const { interlocutorId, idCard, name, lastName, email, phone, userDbId, interlocutorTypeDbId, dependenceDbId } = funcionary;
    
        const interlocutorQ = "INSERT INTO interlocutors (interlocutor_id, name, email, phone, user_db_id, interlocutor_type_db_id) VALUES(?, ?, ?, ?, ?, ?)";
        const personQ = "INSERT INTO persons (id_card, last_name) VALUES(?, ?)";
        const functionaryQ = "INSERT INTO functionaries (interlocutor_db_id, person_db_id, dependence_db_id) VALUES(?, ?, ?)";

        const [interlocutorRows] = await db.query(interlocutorQ, [interlocutorId, name, email, phone, userDbId, interlocutorTypeDbId]);
        const [personRows] = await db.query(personQ, [idCard, lastName]);
        await db.query(functionaryQ, [interlocutorRows.insertId, personRows.insertId, dependenceDbId]);

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
            interlocutor_id,
            name,
            email,
            phone,
            p.id_card,
            p.last_name
        FROM functionaries f
        JOIN interlocutors i ON f.interlocutor_db_id = i.id
        JOIN persons p ON f.person_db_id = p.id
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
            f.id,
            f.interlocutor_db_id,
            f.person_db_id,
            i.interlocutor_id,
            i.name,
            i.email,
            i.phone,
            p.id_card,
            p.last_name,
            d.id AS dependence_db_id,
            d.name AS dependency_name,
            et.name AS type
        FROM functionaries f
        JOIN interlocutors i ON f.interlocutor_db_id = i.id
        JOIN persons p ON f.person_db_id = p.id
        JOIN dependencies d ON f.dependence_db_id = d.id
        JOIN entitytypes et ON i.entity_type_db_id = et.id
        WHERE i.interlocutor_id = ?
        AND
        i.user_db_id = ?
        `;
        const [rows] = await db.query(query, [interlocutorId, userDbId]);

        return rows[0] || null;
    } catch (error) {
        throw error;
    } finally {
        db.release();
    }
}

const edit = async (funcionary) => {
    const db = await connection.clientDB();
    try {
        db.beginTransaction();

        const { id, interlocutorDbId, personDbId, idCard, name, lastName, email, phone, dependenceDbId } = funcionary;
        
        const interlocutorQ = "UPDATE interlocutors SET name = ?, email = ?, phone = ? WHERE id = ?";
        const personQ = "UPDATE persons SET id_card = ?, last_name = ? WHERE id = ?";
        const functionaryQ = "UPDATE functionaries SET dependence_db_id = ? WHERE id = ?";

        await db.query(interlocutorQ, [name, email, phone, interlocutorDbId]);
        await db.query(personQ, [idCard, lastName, personDbId]);
        await db.query(functionaryQ, [dependenceDbId, id]);

        db.commit();
    } catch (error) {
        throw error;
    } finally {
        db.release();
    }
}

const remove = async (funcionary) => {
    const db = await connection.clientDB();
    try {
        db.beginTransaction();
        
        const interlocutorQ = "DELETE FROM interlocutors WHERE id = ?";
        const personQ = "DELETE FROM persons WHERE id = ?";

        await db.query(interlocutorQ, [funcionary.interlocutorDbId]);
        await db.query(personQ, [funcionary.personDbId]);

        db.commit();
    } catch (error) {
        db.rollback();
        throw error;
    } finally {
        db.release();
    }
}

export default { create, read, searchById, edit, remove };
