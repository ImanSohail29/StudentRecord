const firebase = require("../config/firebaseConfig")
console.log(firebase)
const db = firebase.firestore();
const getStudents = async (req, res, next) => {
    try {
        const snapshot = await db.collection('students').get();
        const students = [];
        snapshot.forEach(doc => {
            students.push({ id: doc.id, ...doc.data() });
        });
        res.json(students);
    }
    catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send('Internal Server Error');
    }
}
const newStudent = async (req, res, next) => {
    console.log(req.body)
    const students = req.body; // Assuming the request body contains an array of student objects

    try {
        const batch = db.batch();
        students.forEach(student => {
            const studentRef = db.collection('students').doc(); // Generate unique ID for each student
            batch.set(studentRef, student);
        });
        await batch.commit();
        res.status(201).send('Students imported successfully');
    } catch (error) {
        console.error('Error importing students:', error);
        res.status(500).send('Internal Server Error');
    }
}
const updateStudent = async (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    try {
        const { id } = req.params;
        const { Name, Age, Grade } = req.body;
        console.log("req.body:   "+Name+" "+Age+" "+Grade+" ")
        await db.collection('students').doc(id).update({ Name, Age, Grade });
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteStudent = async (req, res, next) => {
    const studentId = req.params.id;
    console.log(studentId)
    try {
        await db.collection('students').doc(studentId).delete();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { getStudents, newStudent, deleteStudent, updateStudent }