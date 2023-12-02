import { connection } from "../../db/connection.js";

const create = async (studentCareerId, semester) => {
    const db = await connection.clientDB();
    const query = "INSERT INTO students_history (student_career_id, created_date, semester) VALUES (?, NOW(), ?)";
    await db.query(query, [studentCareerId, semester]);
    db.release();
}

export default { create };
