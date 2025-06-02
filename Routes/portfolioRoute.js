const express = require('express');
// const router = express.Router();
// const { sendEmailController } = require('../Controllers/portfolioController');
const { sendEmailController } = require('../Controllers/portfolioController');


// router object 
const router = express.Router();

// routes
// router.post("/sendEmail", sendEmailController)
router.post("/sendEmail", sendEmailController);

//exports
module.exports = router;
