const {appPath, writeFile, unLinkFile} = require('../../lib/path.js')
// const restorantModel = require('../../graphql/restourant/restorant-service/model.js')
// const restOrderWaitingModel = require('../../graphql/restourant/rest-order-waiting/model.js')

module.exports = {
    RESTORANT_SERVICE_IMG: async (req, res) => {
        try {
            const multipart = req.files.file
            const { restorantServiceID } = req.body
            const iterator = multipart[0] ? multipart.length : 1
            let resFile

            for (let i = 0; i < iterator; i++) {

                const {name, data} = iterator !== 1 ? multipart[i] : multipart

                if (!data || !restorantServiceID) return res.status(400).send({error: 'missing data'})

                const mimetype = name.split('.').pop()
                if (mimetype !== 'png' && mimetype !== 'jpg' && mimetype !== 'jpeg') return res.status(400).send({error: 'invalid file type'})
    
                const fileName = `${new Date().getTime()}.${mimetype}`
                
                const pathName = `/restorant-img/${fileName}`
                const file = appPath(`public${pathName}`)

                const serviceImg = await restorantModel.getRestorantImg(restorantServiceID)

                if (serviceImg && serviceImg.restaurant_image) unLinkFile(appPath(`public${serviceImg.restaurant_image}`))
                
                if (iterator === 1) {
                    writeFile(file, data, async(err) => console.log(err))
                    resFile = await restorantModel.createUpdateRestImg(pathName, restorantServiceID)
                }
            }
            if (resFile) return res.json({message: 'file created'})
            else return res.status(400).json({message: 'file not created'})

        } catch (error) {
            console.log(error)
        }
    },
    RESTORANT_FOOD: async (req, res) => {
        try {
            const {name, data} = req.files.file
            const { foodID } = req.body

            if (!data || !foodID) return res.status(400).send({error: 'missing data'})

            const mimetype = name.split('.').pop()
            if (mimetype !== 'png' && mimetype !== 'jpg' && mimetype !== 'jpeg') return res.status(400).send({error: 'invalid file type'})

            const fileName = `${new Date().getTime()}.${mimetype}`
            
            const pathName = `/food-img/${fileName}`
            const file = appPath(`public${pathName}`)

            // const subService = await restorantModel(foodID)
            // if (subService.sub_service_img) unLinkFile(appPath(`public${subService.sub_service_img}`), err => console.log(err))
                
            writeFile(file, data, err => console.log(err))

            restorantModel.updateRestFoodImg(pathName, foodID)
            res.json({message: pathName})
        } catch (error) {
            console.log(error)
        }
    },
    TABLE_IMG_FOR_CHECK: async (req, res) => {
        try {
            const {name, data} = req.files.file
            const { idForCheck } = req.body

            if (!data || !idForCheck) return res.status(400).send({error: 'missing data'})

            const mimetype = name.split('.').pop()
            if (mimetype !== 'png' && mimetype !== 'jpg' && mimetype !== 'jpeg') return res.status(400).send({error: 'invalid file type'})

            const fileName = `${new Date().getTime()}.${mimetype}`
            
            const pathName = `/food-img/${fileName}`
            const file = appPath(`public${pathName}`)

            // const subService = await restorantModel(idForCheck)
            // if (subService.sub_service_img) unLinkFile(appPath(`public${subService.sub_service_img}`), err => console.log(err))
                
            writeFile(file, data, err => console.log(err))

            restOrderWaitingModel.updateCheckTableImg(idForCheck, pathName)
            res.json({message: pathName})
        } catch (error) {
            console.log(error)
        }
    },
}