'use strict';

// dependencies 
const db = require('../db.js');

// operations
function getValidQuizzes(categoryId) {
    return db.getValidQuizzes(categoryId);
}

function getImageData(quizId, categoryId) {
    return db.getQuizImageData(quizId, categoryId);
}


module.exports = { getValidQuizzes, getImageData};