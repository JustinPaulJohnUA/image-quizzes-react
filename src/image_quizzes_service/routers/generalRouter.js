'use strict';

//dependencies
const express = require('express');
const controller = require('../controllers/generalController.js');
var router = express.Router();

// GETS
router.get('/categories', controller.getAllCategories);

router.get('/categories/:categoryId', controller.getCategoryTitle)

router.get('/categories/:categoryId/image/:quizId', controller.getImageData);



router.get('/quizzes/:categoryId', controller.getValidQuizzes);



router.get('/questions/:quizId', controller.getQuestions)


router.get('/questions/image/:questionId', controller.getQuestionImageData);



// export the router
module.exports = router;