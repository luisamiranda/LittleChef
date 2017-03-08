'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const OAuth = require('./oauth');
const Recipe = require('./recipe');
const RecipeLine = require('./recipeline');

OAuth.belongsTo(User);
User.hasOne(OAuth);

module.exports = {User, Recipe, RecipeLine};
