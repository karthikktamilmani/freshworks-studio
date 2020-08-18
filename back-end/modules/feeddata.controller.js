const { FeedData, Location, Food, FoodKind } = require("../models");
const addSchedule = require("./scheduler");

const findOrCreateLocation = async(location) => {
    try {
        const response = await Location.findOrCreate({
            where: { LOCATION: location },
        });
        return response[0].id;
    } catch (error) {
        throw error;
    }
};

const findOrCreateFood = async(food) => {
    try {
        const response = await Food.findOrCreate({
            where: { FOOD: food },
        });
        return response[0].id;
    } catch (error) {
        throw error;
    }
};

const findOrCreateFoodKind = async(foodKind) => {
    try {
        const response = await FoodKind.findOrCreate({
            where: { FOOD_KIND: foodKind },
        });
        return response[0].id;
    } catch (error) {
        throw error;
    }
};

const addFeedData = async(req, res) => {
    const reqModelMapping = {
        ducksQuantity: "NUMBER_OF_DUCKS",
        time: "TIME",
        foodQuantity: "FOOD_QUANTITY",
        location: "LOCATION_ID",
        food: "FOOD_ID",
        foodKind: "FOOD_KIND_ID",
    };
    const dataObj = {};
    for (const [key, value] of Object.entries(reqModelMapping)) {
        if (["food", "foodKind", "location"].includes(key)) {
            if (key === "food") {
                dataObj[value] = await findOrCreateFood(req.body[key]);
            } else if (key === "location") {
                dataObj[value] = await findOrCreateLocation(req.body[key]);
            } else {
                dataObj[value] = await findOrCreateFoodKind(req.body[key]);
            }
        } else {
            dataObj[value] = req.body[key];
        }
    }
    const query = FeedData.build(dataObj);
    await query
        .save()
        .then(async(response) => {
            const feedDataId = response.id;
            if (req.body.hasOwnProperty("repeat")) {
                try {
                    await addSchedule(feedDataId, dataObj["TIME"], req.body["repeat"]);
                } catch (err) {
                    return res.status(200).json({
                        message: `Data Inserted but cannot schedule`,
                    });
                }
            }
            return res.status(200).json({ status: "Success" });
        })
        .catch((err) => {
            console.error(`error saving feed data ${err}`);
            return res.status(400).json({
                message: `Following error was encountered: ${err}`,
            });
        });
};

const getSuggestionInformation = async(req, res) => {
    try {
        const locationResponse = await Location.findAll({
            attributes: ["LOCATION"],
        });
        const foodResponse = await Food.findAll({ attributes: ["FOOD"] });
        const foodKindResponse = await FoodKind.findAll({
            attributes: ["FOOD_KIND"],
        });
        //
        const locationList = locationResponse.map((x) => x["LOCATION"]);
        const foodList = foodResponse.map((x) => x["FOOD"]);
        const foodKindList = foodKindResponse.map((x) => x["FOOD_KIND"]);
        res.status(200).json({
            location: locationList,
            foodList: foodList,
            foodKind: foodKindList,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: error });
    }
};

const getAllFeedData = async(req, res) => {
    try {
        const feedDataList = await FeedData.findAll({
            attributes: ["NUMBER_OF_DUCKS", "TIME", "FOOD_QUANTITY"],
            include: [
                { model: Location, required: true, attributes: ["LOCATION"] },
                { model: Food, required: true, attributes: ["FOOD"] },
                { model: FoodKind, required: true, attributes: ["FOOD_KIND"] },
            ],
        });
        res.status(200).json({ status: "ok", data: feedDataList });
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: error });
    }
};

module.exports = {
    addFeedData,
    getSuggestionInformation,
    getAllFeedData,
    findOrCreateLocation,
    findOrCreateFood,
    findOrCreateFoodKind,
};