import { connection } from "../../db/connection.js";

const create = async (document) => {
    const db = await connection.clientDB();
    try {
        db.beginTransaction();
    
        const documentQ = `
        INSERT INTO documents 
        (
            document_id,
            name,
            file_number,
            type_file,
            file_route,
            document_type_db_id,
            subject,
            annexes,
            require_response,
            size,
            created_date,
            sender_db_id,
            addressee_db_id,
            user_db_id
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?)
        `;

        await db.query(documentQ, [
            document.documentId,
            document.name,
            document.fileNumber,
            document.typeFile,
            document.fileRoute,
            document.documentTypeDbId,
            document.subject,
            document.annexes,
            document.requireResponse,
            document.size,
            document.sender.id,
            document.addressee.id,
            document.userDbId
        ]);

        if(!document.typeFile) {
            await createReceivedAndDispatched(db, document);
        }

        db.commit();
    } catch (error) {
        db.rollback();
        throw error;
    } finally {
        db.release();
    }
}

const createReceivedAndDispatched = async (db, document) => {
    const {id, receivedDbId} = document;

    const receivedDispatchedQ = "INSERT INTO documents_received_dispatched (document_received_db_id, document_dispatched_db_id) VALUES(?, ?)";
    await db.query(receivedDispatchedQ, [receivedDbId, id]);
}

const read = async (userDbId) => {
    const db = await connection.clientDB();
    try {
        const query = `
        SELECT
            d.id,
            d.document_id,
            d.name,
            d.file_number,
            d.type_file,
            d.subject,
            d.annexes,
            d.require_response,
            d.size,
            d.created_date
        FROM documents d
        JOIN document_types dt ON d.document_type_db_id = dt.id
        WHERE d.user_db_id = ?
        `;
        const [rows] = await db.query(query, [userDbId]);
        
        return rows;
    } catch (error) {
        throw error;
    } finally {
        db.release();
    }
}

const searchById = async (documentId, userDbId) => {
    const db = await connection.clientDB();
    try {
        const query = `
        SELECT
            d.id,
            d.document_id,
            d.name,
            d.file_number,
            d.type_file,
            dt.id AS document_type_db_id,
            dt.name AS document_type_name,
            d.subject,
            d.annexes,
            d.require_response,
            d.size,
            d.created_date,
            s.entity_id AS sender_id,
            ets.name AS sender_type_name,
            a.entity_id AS addressee_id,
            eta.name AS addressee_type_name,
            dr.document_id AS received_id
        FROM documents d
        JOIN document_types dt ON d.document_type_db_id = dt.id
        JOIN interlocutors s ON d.sender_db_id = s.id
        JOIN interlocutors a ON d.addressee_db_id = a.id
        JOIN entity_types ets ON s.entity_type_db_id = ets.id
        JOIN entity_types eta ON a.entity_type_db_id = eta.id
        LEFT JOIN documents_received_dispatched drd ON d.id = drd.document_dispatched_db_id
		LEFT JOIN documents dr ON dr.id = drd.document_received_db_id
        WHERE d.document_id = ? AND
        d.user_db_id = ?
        `;
        const [rows] = await db.query(query, [documentId, userDbId]);
        
        return rows[0] || null;
    } catch (error) {
        throw error;
    } finally {
        db.release();
    }
}

const edit = async (document) => {
    const db = await connection.clientDB();
    try {
        db.beginTransaction();
        const documentQ = `
        UPDATE documents 
        SET 
            name = ?, 
            file_number = ?, 
            type_file = ?, 
            document_type_db_id = ?, 
            subject = ?, 
            annexes = ?, 
            require_response = ?, 
            size = ?,  
            sender_db_id = ?, 
            addressee_db_id = ? 
        WHERE document_id = ?`;

        await db.query(documentQ, [
            document.name,
            document.fileNumber,
            document.typeFile,
            document.documentTypeDbId,
            document.subject,
            document.annexes,
            document.requireResponse,
            document.size,
            document.sender.id,
            document.addressee.id,
            document.documentId
        ]);

        if(!document.typeFile) {
            await editReceivedAndDispatched(db, document);
        }

        db.commit();
    } catch (error) {
        db.rollback();
        throw error;
    } finally {
        db.release();
    }
}

const editReceivedAndDispatched = async (db, document) => {
    const receivedDispatchedQ = "DELETE FROM documents_received_dispatched WHERE document_dispatched_db_id = ?";
    db.query(receivedDispatchedQ, [document.id]);
    await createReceivedAndDispatched(db, document);
}

const remove = async (document) => {
    const db = await connection.clientDB();
    try {
        db.beginTransaction();

        const receivedDispatchedQ = "DELETE FROM documents_received_dispatched WHERE document_dispatched_db_id = ?";
        const documentQ = "DELETE FROM documents WHERE id = ?";

        db.query(receivedDispatchedQ, [document.id]);
        db.query(documentQ, [document.id]);

        db.commit();
    } catch (error) {
        db.rollback();
        throw error;
    } finally {
        db.release();
    }
}

export default { create, read, searchById, edit, remove };
