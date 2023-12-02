import { connection } from "../../db/connection.js"

const create = async (documentReceivedId, documentDispatchedId) => {
    const db = await connection.clientDB();
    const query = "INSERT INTO documents_received_dispatched (document_received_id, document_dispatched_id) VALUES(?, ?)";
    const [result] = await db.query(query, [documentReceivedId, documentDispatchedId]);
    db.release();

    return result.insertId;
}

const edit = async (documentReceivedId, documentDispatchedId) => {
    const db = await connection.clientDB();
    const query = "UPDATE documents_received_dispatched SET document_received_id = ? WHERE document_dispatched_id = ?";
    await db.query(query, [documentReceivedId, documentDispatchedId]);
    db.release();
}

const remove = async (documentDispatchedId) => {
    const db = await connection.clientDB();
    const query = "DELETE FROM documents_received_dispatched WHERE document_dispatched_id = ?";
    await db.query(query, [documentDispatchedId]);
    db.release();
}

export default { create, edit, remove };