const {Router} = require('express')
const router = Router()
const airportsController = require('../controllers/airportsController');

router.post('/collect', airportsController.findAirports)
router.get('/', airportsController.getAllAirports)
router.post('/', airportsController.createNewAirport)
router.put('/:id', airportsController.updateAirport)
router.delete('/:id', airportsController.deleteAirport)

module.exports = router;
