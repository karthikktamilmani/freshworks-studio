// Import core dependencies
const express = require('express');

// Import controllers
const {
    addFeedData,
    getSuggestionInformation,
    getAllFeedData
} = require('./feeddata.controller');

// Revealing module pattern
const router = () => {
    const feedDataRouter = express.Router();

    feedDataRouter.route('/feed').post(addFeedData);
    feedDataRouter.route('/suggestions').get(getSuggestionInformation);
    feedDataRouter.route('/feed').get(getAllFeedData);

    return feedDataRouter;
}


module.exports = router;