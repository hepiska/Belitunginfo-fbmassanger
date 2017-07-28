const router = require('express').Router();
const spotControler = require('../controlers/spot');

router.post('/Spot',spotControler.addSpot );
router.get('/Spot/:id',spotControler.showSpot );
router.get('/Spot',spotControler.showSpots );
router.delete('/Spot/:id',spotControler.deleteSpot );

router.post('/image',spotControler.addImage);
router.get('/image',spotControler.showImage);
router.delete('/image/:id',spotControler.deleteImage)
module.exports = router
