'use strict';

// dependencies
const categories = require('../models/categories.js');
const questions = require('../models/questions.js');
const quizzes = require('../models/quizzes.js');
const question_to_quiz = require('../models/question_to_quiz');

// operations
function getAllCategories(req, res){
    categories.getAllCategories()
    .then(cats => {console.log(cats); res.json(cats)})
    .catch(e => {console.log(e); res.status(500).send('Error in generalController.js -> getAllCategories() -> Cannot retrieve categories from model')});
};

function getValidQuizzes(req, res){
    let categoryId = req.params.categoryId;
    quizzes.getValidQuizzes(categoryId)
    .then(quizzes => {console.log(quizzes); res.json(quizzes)})
    .catch(e => {console.log(e); res.status(500).send('Error in generalController.js -> getValidQuizzes() -> Cannot retrieve quizzes from model')});
}

function getImageData(req, res) {
    let quizId = Number(req.params.quizId);
    let categoryId = Number(req.params.categoryId);

    quizzes.getImageData(quizId, categoryId)
    .then( data => {
        console.log('sending file...');
        res.contentType('image/png');
        res.send(data);
    })
    .catch( e => res.status(404).send('No pictures associated with the given quizId and categoryId were found'))
}

function getQuestionImageData(req, res) {
    let questionId = Number(req.params.questionId);

    questions.getImageData(questionId)
    .then(data => {
        console.log(data)
        console.log('sending file...');
        res.contentType('image/png');
        res.send(data);
    })
    .catch( e => res.status(404).send('No pictures associated with the given quizId and categoryId were found'))
}

function getCategoryTitle(req, res) {
    let categoryId = Number(req.params.categoryId);
    console.log(categoryId)

    categories.getCategoryTitle(categoryId)
    .then(title => res.json(title))
    .catch(e => {console.log(e); res.status(500).send('Cannot find title with given categoryId')})
}


function getQuestions(req, res) {
    let quizId = Number(req.params.quizId);

    questions.getQuestions(quizId)
    .then(questions => res.json(questions))
    .catch(e => {console.log(e); res.status(500).send('Cannot find questions with given quizId')})
}


module.exports = { getAllCategories, getValidQuizzes, getImageData, getCategoryTitle, getQuestions, getQuestionImageData };