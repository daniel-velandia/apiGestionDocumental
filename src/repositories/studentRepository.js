import { connection } from "../db/connection.js"

const create = async (entityId, personId) => {
    const db = await connection.clientDB();
    const query = "INSERT INTO students (entity_id, person_id) VALUES(?, ?)";
    const [result] = await db.query(query, [entityId, personId]);
    db.release();
    
    return result.insertId;
}

const read = async (userId) => {
    const db = await connection.clientDB();
    const query = `
        WITH RankedStudents AS (
            SELECT
                s.id AS student_id,
                s.person_id,
                e.entity_id,
                e.name,
                e.email,
                e.phone,
                e.user_id,
                e.entity_type_id,
                c.career,
                sc.career_id,
                p.id_card,
                p.last_name,
                sh.id AS history_id,
                sh.created_date,
                sh.semester,
                ROW_NUMBER() OVER (PARTITION BY s.id ORDER BY sh.id DESC) AS RowNum
            FROM students s
            JOIN entities e ON s.entity_id = e.id
            JOIN students_careers sc ON s.id = sc.student_id
            JOIN careers c ON sc.career_id = c.id
            JOIN persons p ON s.person_id = p.id
            LEFT JOIN students_history sh ON sc.id = sh.student_career_id
            WHERE e.user_id = ?
        )
        SELECT
            student_id,
            person_id,
            entity_id,
            name,
            email,
            phone,
            user_id,
            entity_type_id,
            career,
            career_id,
            id_card,
            last_name,
            history_id,
            created_date,
            semester
        FROM RankedStudents
        WHERE RowNum = 1;
    `;
    const [rows] = await db.query(query, [userId]);
    db.release();

    return rows;
}

const searchById = async (entityId, userId) => {
    const db = await connection.clientDB();
    const query = `
        SELECT
            s.id,
            sc.career_id,
            s.person_id,
            e.entity_id,
            e.name,
            e.email,
            e.phone,
            e.user_id,
            et.type,
            c.career,
            sc.career_id,
            p.id_card,
            p.last_name,
            sh.created_date,
            sh.semester,
            sh.id AS student_history_id
        FROM students s
        JOIN entities e ON s.entity_id = e.id
        JOIN entities_types et ON e.entity_type_id = et.id
        JOIN students_careers sc ON s.id = sc.student_id
        JOIN careers c ON sc.career_id = c.id
        JOIN persons p ON s.person_id = p.id
        LEFT JOIN students_history sh ON sc.id = sh.student_career_id
        WHERE e.entity_id = ?
        AND
        e.user_id = ?
    `;
    const [rows] = await db.query(query, [entityId, userId]);
    db.release();

    return rows || null;
}

export default { create, read, searchById };