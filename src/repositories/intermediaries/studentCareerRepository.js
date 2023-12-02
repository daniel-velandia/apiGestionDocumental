import { connection } from "../../db/connection.js"

const create = async (studentId, careerId) => {
    const db = await connection.clientDB();
    const query = "INSERT INTO students_careers (student_id, career_id) VALUES(?, ?)";
    const [result] = await db.query(query, [studentId, careerId]);
    db.release();

    return result.insertId;
}

const searchByIds = async (studentId, careerId) => {
    const db = await connection.clientDB();
    const query = "SELECT * FROM students_careers WHERE student_id = ? AND career_id = ?";
    const [rows] = await db.query(query, [studentId, careerId]);
    db.release();

    return rows[0] || null;
}

export default { create, searchByIds };