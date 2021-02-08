'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./dev.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  IMG_URL : '"http://localhost:9916/"',
  BASE_URL : '"http://localhost:6800"',
  JG_COOKIE : '"smart_jgxq_cookie"',
  COOKIE_DOMAIN : '"localhost"',
})
