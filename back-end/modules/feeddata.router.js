// Import core dependencies
const express = require('express');

// Import controllers
const {
    addFeedData
} = require('./feeddata.controller');

// Revealing module pattern
const router = () => {
    const feedDataRouter = express.Router();

    feedDataRouter.route('/addData').post(addFeedData);

    return feedDataRouter;
}


module.exports = router;