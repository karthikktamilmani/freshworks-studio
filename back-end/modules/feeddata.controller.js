const { Location, Food, FoodKind, FeedData } = require("../models/data-dict");

const getLocationId = async(location) => {
    try {
        const response = await Location.findOrCreate({
            where: { LOCATION: location },
        });
        return response[0].id;
    } catch (error) {
        console.error(`error fetching location ${error}`);
        throw error;
    }
};

const getFoodId = async(food) => {
    try {
        const response = await Food.findOrCreate({
            where: { FOOD: food },
        });
        return response[0].id;
    } catch (error) {
        console.error(`error fetching food ${error}`);
        throw error;
    }
};

const getFoodKindId = async(foodKind) => {
    try {
        const response = await FoodKind.findOrCreate({
            where: { FOOD_KIND: foodKind },
        });
        return response[0].id;
    } catch (error) {
        console.error(`error fetching food kind ${error}`);
        throw error;
    }
};

const addSchedule = async(feedDataId, time, repeatedDays) => {
    try {
        const minutes = time.split(":")[1];
        const hours = time.split(":")[0];
        const ruleParams = {
            Name: `trigger_${feedDataId}`,
            RoleArn: RULE_ARN,
            ScheduleExpression: `cron(${minutes} ${hours} ? * ${repeatedDays} *)`,
            State: "ENABLED",
        };
        const targetParams = {
            Rule: `trigger_${feedDataId}`,
            Targets: [{
                Arn: LAMBDA_ARN,
                Id: LAMBDA_FUNCTION_NAME,
                Input: JSON.stringify({ key: feedDataId }),
            }, ],
        };

        const ruleResponse = await new Promise((resolve, reject) => {
            cwevents.putRule(ruleParams, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        console.log("Success rule", ruleResponse);
        const lambdaParams = {
            Action: "lambda:InvokeFunction",
            FunctionName: LAMBDA_FUNCTION_NAME,
            Principal: "events.amazonaws.com",
            SourceArn: ruleResponse.RuleArn,
            StatementId: `ducks_${feedDataId}`,
        };

        const permissionResponse = await new Promise((resolve, reject) => {
            lambda.addPermission(lambdaParams, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
        const targetResponse = await new Promise((resolve, reject) => {
            cwevents.putTargets(targetParams, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        return true;
    } catch (error) {
        console.error(error);
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
                dataObj[value] = await getFoodId(req.body[key]);
            } else if (key === "location") {
                dataObj[value] = await getLocationId(req.body[key]);
            } else {
                dataObj[value] = await getFoodKindId(req.body[key]);
            }
        } else {
            dataObj[value] = req.body[key];
        }
    }
    const query = FeedData.build(dataObj);
    query
        .save()
        .then(async(response) => {
            const feedDataId = response.id;
            if (req.body.hasOwnProperty("repeat")) {
                try {
                    await addSchedule(feedDataId, dataObj["TIME"], req.body["repeat"]);
                } catch (err) {
                    console.log(err);
                }
            }
            res.status(200).json({ status: "Success" });
        })
        .catch((err) => {
            console.error(`error saving feed data ${err}`);
            res.status(400).json({
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
};