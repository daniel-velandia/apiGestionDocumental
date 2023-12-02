import { connection } from "../db/connection.js";

const create = async (document, fileId) => {
    const db = await connection.clientDB();
    const query = `
        INSERT INTO documents 
        (
            document_id,
            name,
            file_number,
            type_file,
            file_id,
            document_type_id,
            subject,
            annexes,
            require_response,
            size,
            created_date,
            sender_id,
            addressee_id,
            user_id
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?)
    `;
    const [result] = await db.query(query, [
        document.documentId,
        document.name,
        document.fileNumber,
        document.typeFile,
        fileId,
        document.documentTypeId,
        document.subject,
        document.annexes,
        document.requiresResponse,
        document.size,
        document.senderId,
        document.addresseeId,
        document.userId
    ]);
    db.release();

    return result.insertId;
}

const read = async (userId) => {
    const db = await connection.clientDB();
    const query = `
        SELECT
            d.id,
            d.document_id,
            d.name,
            d.file_number,
            d.type_file,
            dt.type,
            d.subject,
            d.annexes,
            d.require_response,
            d.size,
            d.created_date,
            d.user_id,
            s.entity_id AS sender_id,
            s.entity_type_id AS sender_type_id,
            a.entity_id AS addressee_id,
            a.entity_type_id AS addressee_type_id
        FROM documents d
        JOIN documents_types dt ON d.document_type_id = dt.id
        JOIN entities s ON d.sender_id = s.id
        JOIN entities a ON d.addressee_id = a.id
        WHERE d.user_id = ?
    `;
    const [rows] = await db.query(query, [userId]);
    db.release();

    return rows;
}

const searchById = async (documentId, userId) => {
    const db = await connection.clientDB();
    const query = `
        SELECT
            d.id,
            d.document_id,
            d.name,
            d.file_number,
            d.type_file,
            d.file_id,
            dt.type,
            d.subject,
            d.annexes,
            d.require_response,
            d.size,
            d.created_date,
            d.user_id,
            s.id AS sender_db_id,
            s.entity_id AS sender_id,
            ts.type AS sender_type,
            a.id AS addressee_db_id,
            a.entity_id AS addressee_id,
            ta.type AS addressee_type,
            drd.document_received_id,
            drd.document_dispatched_id,
            dr.document_id AS received_id
        FROM documents d
        JOIN documents_types dt ON d.document_type_id = dt.id
        JOIN entities s ON d.sender_id = s.id
        JOIN entities a ON d.addressee_id = a.id
        JOIN entities_types ts ON s.entity_type_id = ts.id
        JOIN entities_types ta ON a.entity_type_id = ta.id
        LEFT JOIN documents_received_dispatched drd ON d.id = drd.document_dispatched_id
        LEFT JOIN documents dr ON dr.id = drd.document_received_id
        WHERE d.document_id = ? AND
        d.user_id = ?
    `;
    const [rows] = await db.query(query, [documentId, userId]);
    db.release();

    return rows[0] || null;
}

const searchByIdCard = async (idCard, userId) => {
    const db = await connection.clientDB();
    const query = `
    SELECT DISTINCT documents.*
    FROM persons
    LEFT JOIN students ON persons.id = students.person_id
    LEFT JOIN functionaries ON persons.id = functionaries.person_id
    LEFT JOIN external_persons ON persons.id = external_persons.person_id
    LEFT JOIN entities ON
      entities.id = students.entity_id OR
      entities.id = functionaries.entity_id OR
      entities.id = external_persons.entity_id
    LEFT JOIN documents ON entities.id = documents.sender_id OR entities.id = documents.addressee_id
    WHERE persons.id_card = ?
    AND
    entities.user_id = ?
    `;
    const [rows] = await db.query(query, [idCard, userId]);
    db.release();

    return rows;
}

const searchByNit = async (nit, userId) => {
    const db = await connection.clientDB();
    const query = `
        SELECT DISTINCT d.*
        FROM documents d
            JOIN entities e ON d.user_id = e.user_id
            JOIN companies c ON e.id = c.entity_id
        WHERE c.nit = ?
        AND (d.sender_id = e.id OR d.addressee_id = e.id)
        AND e.user_id = ?
    `;
    const [rows] = await db.query(query, [nit, userId]);
    db.release();

    return rows;
}

const edit = async (document) => {
    const db = await connection.clientDB();
    const query = `
        UPDATE documents 
        SET 
            name = ?, 
            file_number = ?, 
            type_file = ?, 
            document_type_id = ?, 
            subject = ?, 
            annexes = ?, 
            require_response = ?, 
            size = ?,  
            sender_id = ?, 
            addressee_id = ? 
        WHERE document_id = ?
    `;
    await db.query(query, [
        document.name,
        document.file_number,
        document.type_file,
        document.document_type_id,
        document.subject,
        document.annexes,
        document.requires_response,
        document.size,
        document.sender_id,
        document.addressee_id,
        document.document_id
    ]);
    db.release();
}

export default { create, read, searchById, searchByIdCard, searchByNit, edit };
