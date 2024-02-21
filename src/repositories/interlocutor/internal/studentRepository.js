import { connection } from "../../../db/connection.js"

const create = async (student) => {
    const db = await connection.clientDB();
    try {
        db.beginTransaction();
    
        const {interlocutorId, idCard, name, lastName, email, phone, userDbId, interlocutorTypeDbId, studyData} = student;

        const interlocutorQ = "INSERT INTO interlocutors (interlocutor_id, name, email, phone, user_db_id, interlocutor_type_db_id) VALUES(?, ?, ?, ?, ?, ?)";
        const personQ = "INSERT INTO persons (idCard, lastName) VALUES(?, ?)";
        const studentQ = "INSERT INTO students (interlocutor_db_id, person_db_id) VALUES(?, ?)";
        const studentCareerQ = "INSERT INTO students_careers (student_db_id, career_db_id) VALUES(?, ?)";
        const studyDataQ = "INSERT INTO study_data (student_career_db_id, created_date, semester) VALUES (?, ?, ?)";

        const [interlocutorRows] = await db.query(interlocutorQ, [interlocutorId, name, email, phone, userDbId, interlocutorTypeDbId]);
        const [personRows] = await db.query(personQ, [idCard, lastName]);
        const [studentRows] = await db.query(studentQ, [interlocutorRows.insertId, personRows.insertId]);
        const [studentCareerRows] = await db.query(studentCareerQ, [studentRows.insertId, studyData.careerDbId]);
        await db.query(studyDataQ, [studentCareerRows.insertId, studyData.createdDate, studyData.semester]);

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
            FROM students s
            JOIN interlocutors i ON s.interlocutor_db_id = i.id
            JOIN persons p ON s.person_db_id = p.id
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
                s.id,
                s.interlocutor_db_id,
                s.person_db_id,
                i.interlocutor_id,
                i.name,
                i.email,
                i.phone,
                c.name AS career_name,
                sc.career_db_id,
                p.id_card,
                p.last_name,
                sd.created_date,
                sd.semester,
                it.name AS type
            FROM students s
            JOIN interlocutors i ON s.interlocutor_db_id = i.id
            JOIN interlocutor_types it ON i.interlocutor_type_db_id = it.id
            JOIN students_careers sc ON s.id = sc.student_db_id
            JOIN careers c ON sc.career_db_id = c.id
            JOIN persons p ON s.person_db_id = p.id
            LEFT JOIN study_data sd ON sc.id = sd.student_career_db_id
            WHERE i.interlocutor_id = ?
            AND
            i.user_db_id = ?
        `;
        const [rows] = await db.query(query, [interlocutorId, userDbId]);

        return rows[rows.length - 1] || null;
    } catch (error) {
        throw error;
    } finally {
        db.release();
    }
}

const searchByIdAndDate = async (interlocutorId, userDbId, date) => {
    const db = await connection.clientDB();
    try {
        const query = `
            SELECT
                s.id,
                s.interlocutor_db_id,
                s.person_db_id,
                e.interlocutor_id,
                e.name,
                e.email,
                e.phone,
                c.name AS career,
                sc.career_db_id,
                p.id_card,
                p.last_name,
                sd.created_date,
                sd.semester,
                it.name AS type
            FROM students s
            JOIN entities e ON s.entity_db_id = e.id
            JOIN entity_types it ON e.interlocutor_type_db_id = it.id
            JOIN students_careers sc ON s.id = sc.student_db_id
            JOIN careers c ON sc.career_db_id = c.id
            JOIN persons p ON s.person_db_id = p.id
            LEFT JOIN study_data sd ON sc.id = sd.student_career_db_id
            WHERE e.interlocutor_id = ?
            AND
            e.user_db_id = ?
            AND
            sd.created_date < ?
        `;
        const [rows] = await db.query(query, [interlocutorId, userDbId, date]);

        return rows[rows.length - 1] || null;
    } catch (error) {
        throw error;
    } finally {
        db.release();
    }
}

const edit = async (student, isStudyDataChanged) => {
    const db = await connection.clientDB();
    try {
        db.beginTransaction();
        
        const {id, interlocutorDbId, personDbId, idCard, name, lastName, email, phone, studyData} = student;

        const interlocutorQ = "UPDATE interlocutors SET name = ?, email = ?, phone = ? WHERE id = ?";
        const personQ = "UPDATE persons SET id_card = ?, last_name = ? WHERE id = ?";

        await db.query(interlocutorQ, [name, email, phone, interlocutorDbId]);
        await db.query(personQ, [idCard, lastName, personDbId]);

        if(isStudyDataChanged) {
            await editStudyData(db, id, studyData);
        }

        db.commit();
    } catch (error) {
        db.rollback();
        throw error;
    } finally {
        db.release();
    }
}

const editStudyData = async (db, id, studyData) => {
    const studentCareerQ = "SELECT * FROM students_careers WHERE student_db_id = ? AND career_db_id = ?";
    const studentCareerQI = "INSERT INTO students_careers (student_db_id, career_db_id) VALUES(?, ?)";
    const studyDataQ = "INSERT INTO study_data (student_career_db_id, created_date, semester) VALUES (?, ?, ?)";

    const {careerDbId, semester, createdDate} = studyData;
    let studentCareerDbId = 0;

    const [studentCareerRows] = await db.query(studentCareerQ, [id, careerDbId]);

    if(!studentCareerRows[0]) {
        const [studentCareerRows] = await db.query(studentCareerQI, [id, careerDbId]);
        studentCareerDbId = studentCareerRows.insertId;
    } else {
        studentCareerDbId = studentCareerRows[0].id;
    }

    await db.query(studyDataQ, [studentCareerDbId, createdDate, semester]);
}

const remove = async (student) => {
    const db = await connection.clientDB();
    try {
        db.beginTransaction();
        
        const interlocutorQ = "DELETE FROM interlocutors WHERE id = ?";
        const personQ = "DELETE FROM persons WHERE id = ?";

        await db.query(interlocutorQ, [student.interlocutorDbId]);
        await db.query(personQ, [student.personDbId]);

        db.commit();
    } catch (error) {
        db.rollback();
        throw error;
    } finally {
        db.release();
    }
}

export default { create, read, searchById, searchByIdAndDate, edit, remove };