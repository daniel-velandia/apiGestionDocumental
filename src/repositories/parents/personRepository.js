import { connection } from "../../db/connection.js"

const create = async (person) => {
    const db = await connection.clientDB();
    const query = "INSERT INTO persons (id_card, last_name) VALUES(?, ?)";
    const [result] = await db.query(query, [person.idCard, person.lastName]);
    db.release();

    return result.insertId;
}

const edit = async (person) => {
    const db = await connection.clientDB();
    const query = "UPDATE persons SET id_card = ?, last_name = ? WHERE id = ?";
    await db.query(query, [person.id_card, person.last_name, person.person_id]);
    db.release();
}

const remove = async (personId) => {
    const db = await connection.clientDB();
    const query = "DELETE FROM persons WHERE id = ?";
    await db.query(query, [personId]);
    db.release();
}

export default { create, edit, remove };