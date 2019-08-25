require('mocha')
require('verify-it')
const chaiConfig = require('chai')
const chaiAsPromised = require('chai-as-promised')

chaiConfig.use(chaiAsPromised)
chaiConfig.should()
