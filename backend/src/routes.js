const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router()

// Query parms: request.query (utilizado para ordenação, busca, filtro, paginação...)
// Route parms: request.parms (utilizado para identificação de um recurso na alteração, remoção...)
// Body: request.body (utilizado para enviar os dados do registro)
routes.post('/dev', DevController.store)
routes.get('/dev', DevController.index)
routes.get('/search', SearchController.index)

// torna as rotas conhecidas por todo o sistema
module.exports = routes