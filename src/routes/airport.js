const {Router} = require('express')
const router = Router()
const airportsController = require('../controllers/airportsController');

router.post('/collect', airportsController.findAirports)
router.get('/', airportsController.getAllAirports)
router.post('/', airportsController.createNewAirport)
router.put('/:id', airportsController.updateAirport)
router.delete('/:id', airportsController.deleteAirport)

router.post('/connect/collect', airportsController.findConnections)
router.get('/connect', airportsController.getAllConnections)
router.post('/connect', airportsController.createNewConnection)
router.post('/connect/path', airportsController.findPath)

module.exports = router;
