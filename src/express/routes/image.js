const {appPath, writeFile, unLinkFile} = require('../../lib/path.js')
const userModel = require('../../graphql/restourant/test/model')
const {pubsub} = require('../../lib/pubsub')
// const myServicesModel = require('../../graphql/med/my-services/model')
// const serviceModel = require('../../graphql/med/services/model')
// const subServiceModel = require('../../graphql/med/sub-services/model')

module.exports = {
    USER_IMG: async (req, res) => {
        try {

            const {name, data} = req.files.file
            const { id } = req.body

            if (!data || !id) return res.status(400).send({error: 'missing data'})
            
            const mimetype = name.split('.').pop()
            if (mimetype !== 'png' && mimetype !== 'jpg' && mimetype !== 'jpeg') return res.status(400).send({error: 'invalid file type'})
            
            const fileName = `${new Date().getTime()}.${mimetype}`
            
            const pathName = `/user-img/${fileName}`
            const file = appPath(`public${pathName}`)

            // const user = await userModel.getUser(userID)
            // if (user && user.img) unLinkFile(appPath(`public${user.img}`))
            
            writeFile(file, data, async(err) => console.log(err))

            const img = await userModel.updateFoodImg(pathName, id)
            if (img) {
                pubsub.publish('FOOD', img)
            }

            res.json({message: 'file created'})
        } catch (error) {
            console.log(error)
        }
    },
    USER_SERVICE_IMG: async (req, res) => {
        try {
            const multipart = req.files.file
            const { doctorServiceID } = req.body
            
            const iterator = multipart[0] ? multipart.length : 1
            let resFile

            for (let i = 0; i < iterator; i++) {

                const {name, data} = iterator !== 1 ? multipart[i] : multipart

                if (!data || !doctorServiceID) return res.status(400).send({error: 'missing data'})

                const mimetype = name.split('.').pop()
                if (mimetype !== 'png' && mimetype !== 'jpg' && mimetype !== 'jpeg') return res.status(400).send({error: 'invalid file type'})
    
                const fileName = `${new Date().getTime()}.${mimetype}`
                
                const pathName = `/user-service-img/${fileName}`
                const file = appPath(`public${pathName}`)

                const serviceImg = await myServicesModel.getDoctorServiceImg(doctorServiceID)
                if (serviceImg && serviceImg.clinica_image) unLinkFile(appPath(`public${serviceImg.clinica_image}`))
                
                if (iterator === 1) {
                    writeFile(file, data, async(err) => console.log(err))
                    resFile = await myServicesModel.createServiceImg(doctorServiceID, pathName)
                }
            }
            if (resFile) return res.json({message: 'file created'})
            else return res.status(400).json({message: 'file not created'})

        } catch (error) {
            console.log(error)
        }
    },
    SERVICE_IMG: async (req, res) => {
        try {
            const {name, data} = req.files.file
            const { serviceid: serviceID, color } = req.headers

            const verifyColorHex = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

            if (!data || !serviceID || !verifyColorHex.test(color)) return res.status(400).send({error: 'missing data'})

            const mimetype = name.split('.').pop()
            if (mimetype !== 'png' && mimetype !== 'jpg' && mimetype !== 'jpeg') return res.status(400).send({error: 'invalid file type'})

            const fileName = `${new Date().getTime()}.${mimetype}`
            
            const pathName = `/service-img/${fileName}`
            const file = appPath(`public${pathName}`)

            const service = await serviceModel.servicesById(serviceID)
            if (service && service.service_img) unLinkFile(appPath(`public${service.service_img}`))
        
            writeFile(file, data, async(err) => console.log(err))

            serviceModel.updateServiceImg(serviceID, pathName, color)
            res.json({message: 'file created'})
        } catch (error) {
            console.log(error)
        }
    },
    SUB_SERVICE_IMG: async (req, res) => {
        try {
            const {name, data} = req.files.file
            const { subservice: subServiceID } = req.headers

            if (!data || !subServiceID) return res.status(400).send({error: 'missing data'})

            const mimetype = name.split('.').pop()
            if (mimetype !== 'png' && mimetype !== 'jpg' && mimetype !== 'jpeg') return res.status(400).send({error: 'invalid file type'})

            const fileName = `${new Date().getTime()}.${mimetype}`
            
            const pathName = `/sub-service-img/${fileName}`
            const file = appPath(`public${pathName}`)

            const subService = await subServiceModel.subServicesByID(subServiceID)
            if (subService && subService.sub_service_img) unLinkFile(appPath(`public${subService.sub_service_img}`), err => console.log(err))
                
            writeFile(file, data, err => console.log(err))

            subServiceModel.updateSubServiceImg(subServiceID, pathName)
            res.json({message: pathName})
        } catch (error) {
            console.log(error)
        }
    },
}