'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./dev.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  IMG_URL : '"http://smallsmart.top:9920/images/"',
  BASE_URL : '"http://smallsmart.top:9920"',
  JG_COOKIE : '"smart_jgxq_cookie"'
})
