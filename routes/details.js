const express = require('express')
const { getInfo, rules } = require('../controllers/rulevalidation')
const { payloadCheck } = require('../utils/condition')
const router = express.Router()

router.route('/').get(getInfo)



module.exports = router