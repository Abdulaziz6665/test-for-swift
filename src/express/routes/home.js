// const serviceModel = require('../../graphql/med/services/model')
// const subServicesModel = require('../../graphql/med/sub-services/model')

module.exports = {
  SERVICES: async (req, res) => {
    try {
      const services = await serviceModel.services()
      res.json(services)

    } catch (error) {
      return error
    }
  },
  SUB_SERVICES: async (req, res) => {
    try {
      const subServices = await subServicesModel.subServices(req.body.serviceID)
      res.json(subServices)

    } catch (error) {
      return error
    }
  },
}