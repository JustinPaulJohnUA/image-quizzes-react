// dependencies
const db = require('../db.js');

function getQuestions(quizId) {
    return db.getQuestions(quizId);
}

function getImageData(questionId) {
    return db.getQuestionImageData(questionId);
}

module.exports = { getQuestions, getImageData };