'use strict';

// dependencies
const db = require('../db.js');

// operations
function getAllCategories() {
    return db.getAllCategories();
}

function getCategoryTitle(categoryId){
    return db.getCategoryTitle(categoryId);
}

module.exports = { getAllCategories, getCategoryTitle };