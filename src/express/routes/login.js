const fetch = require('node-fetch');
const moment = require('moment');
// const userModel = require('../../graphql/med/verify/verify');
const { sign } = require('../../lib/jwt');
require('dotenv').config();
const {USER_NAME, PASSWORD, SMS_SEND_URL} = process.env

module.exports = {
    SEND_CODE: async (req, res) => {
        try {

            const { phone } = req.body;

            if (phone === '998901234567') return res.json({ codeSended: true, code: 1122 })

            if (phone.length !== 12) return res.json({ error: 'Phone is required 12 characters' })

            const code = Math.floor(Math.random() * (9999 - 1000) + 1000);

            const sendedCode = await userModel.verify(phone, code, new Date(+new Date() + 60000 * 2))

            const data = {
                messages: [
                    {
                        recipient: `${phone}`,
                        "message-id": "abc000000001",
                        "sms": {
                            "originator": 3700,
                            "content": {
                                "text": code
                            }
                        }
                    }
                ]
            }

            // fetch(SMS_SEND_URL, {
            //     method: 'POST',
            //     headers: {
            //         'Content-type': 'Application/json; charset=UTF-8',
            //         'Authorization': 'Basic ' + Buffer.from(USER_NAME + ":" + PASSWORD).toString('base64')
            //     },
            //     body: JSON.stringify(data)
            // })

            if (sendedCode) {
                res.json({ codeSended: true, code })
            } else {
                res.json({ codeSended: false })
            }

        } catch (error) {
            console.log(error)
        }
    },
    CHECK_CODE: async (req, res) => {
        try {

            const { phone, code } = req.body;

            if (phone === '998901234567' && Number(code) === 1122) {
                
                const findUser = await userModel.hasUser(phone)
                const token = sign({ userId: findUser.id })
                res.json({
                    codeValid: true,
                    userId: findUser.id,
                    token,
                    userName: findUser.name,
                    verifyId: null,
                    serviceID: findUser.service_id,
                    status: findUser.profession_status
                });
            }
            const verifyUser = await userModel.checkCode(phone)
            if (!verifyUser || verifyUser.sended_code !== (+code)) return res.json({ codeValid: false, userId: null, verifyId: null });

            const findUser = await userModel.hasUser(phone)
            const timeExpire = moment(verifyUser.created_at).format("hh:mm:ss a") > moment(new Date()).format("hh:mm:ss a");

            if (verifyUser && findUser && timeExpire) {
                const token = sign({ userId: findUser.id })
                userModel.deleteVerify(phone)
                res.json({ 
                    codeValid: true,
                    userId: findUser.id,
                    token,
                    userName: findUser.name,
                    verifyId: null,
                    serviceID: findUser.service_id,
                    status: findUser.profession_status
                });

            } else if (verifyUser && timeExpire && !findUser) {
                res.json({ codeValid: true, userId: null, verifyId: verifyUser.id });

            } else {
                res.json({ codeValid: false, userId: null, verifyId: null });
            }

        } catch (error) {
            console.log(error)
        }

    },
    CREATE_USER: async (req, res) => {
        try {

            const { verifyId, name } = req.body;
            const checkVerify = await userModel.verifyByID(verifyId)

            if (!checkVerify || !name) return res.json({ userId: null });

            const user = await userModel.createUser(name, checkVerify.phone)
            const token = sign({ userId: user.id })

            if (user) {
                userModel.deleteVerifyByID(verifyId)
                res.json({ userId: user.id, token, userName: user.name });
            } else {
                return res.json({ userId: null })
            }

            return 5
        } catch (error) {
            console.log(error);
        }
    }
}