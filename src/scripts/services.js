
import config from './configuration.js';

let url = config.base_url;

function getJsonFromResponse(response) {
    if (response.status === 200) {
        return response.json();
    } else {
        throw Error(response.status);
    }
}

const service = {
    getAllCategories: () => {
        return fetch(url + '/home/categories')
        .then(response => getJsonFromResponse(response))
        .catch(e => {console.log(e)})
    },

    getValidQuizzes: (categoryId) => {
        return fetch(`${url}/home/quizzes/${categoryId}`)
        .then(response => getJsonFromResponse(response))
        .catch(e => console.log(e))
    },

    getImageURL: (quizId, categoryId) => {
        return `${url}/home/categories/${categoryId}/image/${quizId}`;
    },

    getCategoryTitleFromQuiz: (quizId) => {
        return fetch(`${url}/home/categories/${quizId}`)
        .then(getJsonFromResponse)
        .catch(e => {console.log(e)})
    },

    getAllQuestions: (quizId) => {
        return fetch(`${url}/home/questions/${quizId}`)
        .then(getJsonFromResponse)
        .catch(e => {console.log(e)})
    },

    getQuestionImageURL: (questionId) => {
        return `${url}/home/questions/image/${questionId}`
    }

    
}

export default service;