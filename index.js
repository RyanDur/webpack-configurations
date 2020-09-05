const loaders = require('./loaders');
const merge = require('webpack-merge')

module.exports = {...loaders, merge}