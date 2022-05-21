const {sign: signed, verify: verification} = require('jsonwebtoken');


module.exports = {
   sign: payload => signed(payload, '_S_'),
   verify: accessToken => verification(accessToken, '_S_')
}