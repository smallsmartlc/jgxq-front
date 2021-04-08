'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./dev.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  IMG_URL : '"https://smallsmart.top/source/"',
  BASE_URL : '"https://smallsmart.top/api"',
  JG_COOKIE : '"smart_jgxq_cookie"',
  COOKIE_DOMAIN : '"smallsmart.top"',
})
