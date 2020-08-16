/* Import code dependencies. In this case, these are
learning path module's data models. */
const {
    Location,
    Food,
    FoodKind,
    FeedData
} = require("../models/data-dict");

const getLocationId = async(location) => {
    try {
        const response = await Location.findOrCreate({
            where: { LOCATION: location }
        });

        console.log("location fetched response", response[0].id);
        return response[0].id;
    } catch (error) {
        console.log(`error fetching location ${error}`)
    }
}

const getFoodId = async(food) => {
    try {
        const response = await Food.findOrCreate({
            where: { FOOD: food }
        });

        console.log("Food fetched response", response[0].id)
        return response[0].id;
    } catch (error) {
        console.log(`error fetching food ${error}`)
    }
}

const getFoodKindId = async(foodKind) => {
    try {
        const response = await FoodKind.findOrCreate({
            where: { FOOD_KIND: foodKind }
        });

        console.log("Food kind fetched response", response[0].id)
        return response[0].id;
    } catch (error) {
        console.log(`error fetching food kind ${error}`)
    }
}

const addFeedData = async(req, res) => {
    const reqModelMapping = {
        "ducksQuantity": "NUMBER_OF_DUCKS",
        "time": "TIME",
        "foodQuantity": "FOOD_QUANTITY",
        "location": "LocationId",
        "food": "FoodId",
        "foodKind": "FoodKindId"
    }
    console.log("controller called")
    const dataObj = {};

    for (const [key, value] of Object.entries(reqModelMapping)) {
        if (["food", "foodKind", "location"].includes(key)) {
            if (key === "food") {
                dataObj[value] = await getFoodId(req.body[key]);
            } else if (key === "location") {
                dataObj[value] = await getLocationId(req.body[key]);
            } else {
                dataObj[value] = await getFoodKindId(req.body[key]);
            }
        } else {
            dataObj[value] = req.body[key]
        }
    }

    console.log(dataObj);
    const query = FeedData.build(dataObj);

    query.save().then(() => {
        console.log("feed data saved successfully");
    }).catch((err) => {
        console.log(`error saving feed data ${err}`);
        res
            .status(400)
            .json({
                message: `Following error was encountered: ${err}`
            });
    });


    // const projectID = req.query.projectID;
    // const query = Discussion.find({
    //     projectID: projectID
    // });

    // query.exec(async(err, discussion) => {
    //     if (err) {

    //     } else if (!discussion) {
    //         res.status(404).json({
    //             status: "error",
    //             message: "No discussion thread found for project."
    //         });
    //     } else {
    //         try {
    //             let userIDList = []
    //             discussion.forEach((eachDiscussion) => {
    //                 userIDList.push(eachDiscussion["authorID"]);
    //             });

    //             let userResponse;
    //             if (userIDList.length > 0) {
    //                 userResponse = await fetchUserInfo(userIDList);
    //                 // console.log("ttttttttttttt", userResponse);

    //             }

    //             let discussions = [];
    //             for (var iter = 0; iter < discussion.length; iter++) {
    //                 let eachDiscussion = discussion[iter];
    //                 let eachDiscussionObj = {};
    //                 eachDiscussionObj["_id"] = eachDiscussion["_id"];
    //                 eachDiscussionObj["content"] = eachDiscussion["content"];
    //                 eachDiscussionObj["createdAt"] = eachDiscussion["createdAt"];
    //                 eachDiscussionObj["authorName"] = userResponse[eachDiscussion["authorID"]];
    //                 eachDiscussionObj["likes"] = await getLikesInfo(eachDiscussion["_id"]);
    //                 eachDiscussionObj["replies"] = await getComments(eachDiscussion["_id"]);
    //                 discussions.push(eachDiscussionObj);
    //             }

    //             // console.log("ressssss", discussions);
    //             res.status(200).json({
    //                 status: "success",
    //                 discussions: discussions
    //             });

    //         } catch (error) {
    //             res
    //                 .status(400)
    //                 .json({
    //                     message: `Following error was encountered: ${error}`
    //                 });
    //         }

    //     }
    // });
};

// Export controllers through object export pattern
module.exports = {
    addFeedData
};