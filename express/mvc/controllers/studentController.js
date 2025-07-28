import { getAllStudents } from '../models/studentModel.js';

export const showReport = (req, res) => {
    const students = getAllStudents();
    res.render('report', { students });
};
