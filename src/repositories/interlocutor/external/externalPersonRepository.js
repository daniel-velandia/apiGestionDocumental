import { connection } from "../../../db/connection.js";

const create = async (externalPerson) => {
    const db = await connection.clientDB();
    try {
        db.beginTransaction();

        const { interlocutorId, idCard, name, lastName, email, phone, userDbId, interlocutorTypeDbId, address } = externalPerson;
    
        const interlocutorQ = "INSERT INTO interlocutors (interlocutor_id, name, email, phone, user_db_id, interlocutor_type_db_id) VALUES(?, ?, ?, ?, ?, ?)";
        const personQ = "INSERT INTO persons (id_card, last_name) VALUES(?, ?)";
        const externalPersonQ = "INSERT INTO externalpersons (entityDbId, personDbId, address) VALUES(?, ?, ?)";

        const [interlocutorRows] = await db.query(interlocutorQ, [interlocutorId, name, email, phone, userDbId, interlocutorTypeDbId]);
        const [personRows] = await db.query(personQ, [idCard, lastName]);
        await db.query(externalPersonQ, [interlocutorRows.insertId, personRows.insertId, address]);

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
            i.name,
            i.email,
            i.phone,
            p.id_card,
            p.last_name
        FROM externalpersons ep
        JOIN interlocutors i ON ep.interlocutor_db_id = i.id
        JOIN persons p ON ep.person_db_id = p.id
        WHERE e.user_db_id = ?
        `;
        const [rows] = await db.query(query, [userDbId]);
        
        return rows;
    } catch (error) {
        throw error;
    } finally {
        db.release();
    }
}

const searchById = async (interlocutorDbId, userDbId) => {
    const db = await connection.clientDB();
    try {
        const query = `
        SELECT
            ep.id,
            ep.interlocutor_db_id,
            ep.person_db_id,
            i.interlocutor_id,
            i.name,
            i.email,
            i.phone,
            p.id_card,
            p.last_name,
            ep.address,
            et.name AS type
        FROM externalpersons ep
        JOIN interlocutors i ON ep.interlocutor_db_id = i.id
        JOIN persons p ON ep.person_db_id = p.id
        JOIN entitytypes et ON i.entity_type_db_id = et.id
        WHERE i.interlocutor_id = ?
        AND
        i.user_db_id = ?
    `;
    const [rows] = await db.query(query, [interlocutorDbId, userDbId]);

    return rows[0] || null;
    } catch (error) {
        throw error;
    } finally {
        db.release();
    }
}

const edit = async (externalPerson) => {
    const db = await connection.clientDB();
    try {
        db.beginTransaction();

        const {id, interlocutorDbId, personDbId, idCard, name, lastName, email, phone, address} = externalPerson;
        
        const interlocutorQ = "UPDATE interlocutors SET name = ?, email = ?, phone = ? WHERE id = ?";
        const personQ = "UPDATE persons SET id_card = ?, last_name = ? WHERE id = ?";
        const externalpersonQ = "UPDATE externalpersons SET address = ? WHERE id = ?";

        await db.query(interlocutorQ, [name, email, phone, interlocutorDbId]);
        await db.query(personQ, [idCard, lastName, personDbId]);
        await db.query(externalpersonQ, [address, id]);

        db.commit();
    } catch (error) {
        db.rollback();
        throw error;
    } finally {
        db.release();
    }
}

const remove = async (externalPerson) => {
    const db = await connection.clientDB();
    try {
        db.beginTransaction();
        
        const entityQ = "DELETE FROM interlocutors WHERE id = ?";
        const personQ = "DELETE FROM persons WHERE id = ?";

        await db.query(interlocutorQ, [externalPerson.interlocutorDbId]);
        await db.query(personQ, [externalPerson.personDbId]);

        db.commit();
    } catch (error) {
        db.rollback();
        throw error;
    } finally {
        db.release();
    }
}

export default { create, read, searchById, edit, remove };
