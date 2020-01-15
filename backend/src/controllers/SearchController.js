const axios = require('axios')
const Dev = require('../models/Devs')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    /**
     * Busca pelos Devs num raio de 10km e com um skill específico
     * @param {*} request 
     * @param {*} response 
     */
    async index(request, response) {
        const {lat, lng, tech} = request.query
        const techsArray = parseStringAsArray(tech)
        const devs = await Dev.find({
            techs: {
                $in:techsArray
            },
            location:{
                $near:{
                    $geometry:{
                        type:'Point',
                        coordinates:[lng, lat],
                        $maxDistance:10000
                    },
                }
            }
        })
        return response.json(devs)
    }
}