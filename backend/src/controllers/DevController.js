const axios = require('axios')
const Dev = require('../models/Devs')

module.exports = {

    async index(request, response) {
        const devs = await Dev.find()
        return response.json(devs)
    },

    async store(request, response) {
        console.log(request.body)
        // pega o valor da propriedade github
        const { github, techs, location: { lat: latitude, lng: longitude } } = request.body

        let dev = await Dev.findOne({ github })

        // verificar se o desenvolvedor ja existe pelo login github
        if (!dev) {

            // chamada para a API do github
            const req = await axios.get(`https://api.github.com/users/${github}`)
            const { name = login, bio, avatar_url } = req.data
            console.log(name, bio, avatar_url, github, techs, latitude, longitude)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
            dev = await Dev.create({
                name,
                github,
                bio,
                avatar_url,
                techs,
                location
            })
        }
        return response.json(dev)
    }
}