const router = require('express').Router();
const spotControler = require('../controlers/spot');

router.post('/Spot',spotControler.addSpot );
router.get('/Spot/:id',spotControler.showSpot );
router.get('/Spot',spotControler.showSpots );
router.delete('/Spot/:id',spotControler.deleteSpot );

router.post('/image',spotControler.addImage);

module.exports = router
