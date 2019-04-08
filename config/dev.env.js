'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  REGION:'"oss-cn-beijing"',
  ACCESS_KEYID:'"LTAIal0YgEC3FhQo"',
  ACCESSKEYSECRET:'"XoDuyMlm3bFXuf0NgmGmL8qBvyXw1x"',
  bucket:'"ordersystems"'
})
