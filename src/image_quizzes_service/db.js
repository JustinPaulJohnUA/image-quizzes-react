'use strict';
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// dependencies 
require('dotenv').config();
const { Pool } = require('pg');

// check whether this api is running on production server or not
const isProduction = process.env.IS_PRODUCTION !== 'false';
console.log(`Is this the production environment? ${isProduction ? 'yes' : 'no'}`);

// establish connection to psql database
const postgreConnectionString = 
`postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;

const postgrePool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : postgreConnectionString,
    ssl: isProduction
});

console.log(postgreConnectionString);

// operations

// CATEGORY TABLE
function getAllCategories() {
    return postgrePool.query('select * from categories;')
    .then(result => result.rows);
}

function getCategoryTitle(categoryId) {
    return postgrePool.query('select title from categories where id = $1', [categoryId])
    .then(result => result.rows[0]);
}

//


// QUIZZES TABLE
function getValidQuizzes(categoryId) {
    return postgrePool.query('select * from quizzes where category_id = $1', [categoryId])
    .then(result => {
        if (result.rows[0]) {return result.rows}
        else {throw Error('Quizzes with given ID cannot be found')}
    })
}

function getQuizImageData(quizId, categoryId){
    return postgrePool.query('select picture from quizzes where id = $1 and category_id = $2', [quizId, categoryId])
    .then(result => {
        if (result.rows[0]) { 
            return result.rows[0].picture 
        } else { 
            throw Error('Image with the given id was not found') 
        }
    });
}
//

// QUESTIONS TABLE
function getQuestions(quizId) {
    return postgrePool.query('SELECT * FROM questions INNER JOIN question_to_quiz ON question_to_quiz.quiz_id = $1 and (questions.id = question_to_quiz.question_id);', [quizId])
    .then(result => {
        if (result.rows[0]) {
            return result.rows;
        } else {
            throw Error('Question with given quizId was not found');
        }
    })
}

function getQuestionImageData(questionId){
    return postgrePool.query('select picture from questions where id = $1', [questionId])
    .then(result => {
        if (result.rows[0]) { 
            return result.rows[0].picture;
        } else { 
            throw Error('Image with the given id was not found') 
        }
    });
}
//



// export functions
module.exports = { getAllCategories, getQuizImageData, getValidQuizzes, getCategoryTitle, getQuestions , getQuestionImageData };