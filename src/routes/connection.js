const {Router} = require('express')
const router = Router()
const connectionsController = require('../controllers/connectionsController');

router.post('/collect', connectionsController.findConnections)
router.get('/', connectionsController.getAllConnections)
router.post('/', connectionsController.createNewConnection)
router.post('/shortest_path', connectionsController.findShortestPath)
router.post('/fastest_path', connectionsController.findFastestPath)

module.exports = router;
