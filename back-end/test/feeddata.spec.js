const SequelizeMock = require("sequelize-mock");
const mockDB = new SequelizeMock();
sequelize = new SequelizeMock();
let feedData = require('../modules/feeddata.controller');
const Location = require('../models/location');
const Food = require("../models/food");
const FoodKind = require("../models/foodkind");
let addSchedule = require("../modules/scheduler");

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockRequest = (body) => ({
    body
});

jest.mock("../modules/scheduler");
jest.mock('../models/location', () => {
    return mockDB.define('Location', {
        id: 1,
        LOCATION: "Lake"
    })
});

jest.mock('../models/food', () => {
    return mockDB.define('Food', {
        id: 1,
        FOOD: "Grapes"
    })
});


jest.mock('../models/foodkind', () => {
    return mockDB.define('FoodKind', {
        id: 1,
        FOOD_KIND: "Fruits"
    })
});


jest.mock('../models/feeddata', () => {
    return mockDB.define('FeedData', {
        LOCATION_ID: 1,
        FOOD_ID: 1,
        FOOD_KIND_ID: 1,
        NUMBER_OF_DUCKS: 5,
        TIME: "23:05",
        FOOD_QUANTITY: 5
    })
});

describe("Testing Models", () => {
    it("Should get value from location", async() => {
        const locationId = await feedData.findOrCreateLocation("Lake");
        expect(locationId).toEqual(1);
    });

    it("Should get value from food", async() => {
        const foodId = await feedData.findOrCreateFood("Grapes");
        expect(foodId).toEqual(1);
    });

    it("Should get value from food kind", async() => {
        const foodKindId = await feedData.findOrCreateFoodKind("Fruits");
        expect(foodKindId).toEqual(1);
    });
});

describe("Testing GET controllers", () => {
    it("testing suggestion controller", async() => {
        const resp = mockResponse()
        await feedData.getSuggestionInformation({}, resp);
        expect(resp.status).toHaveBeenCalledWith(200);
    });
    it("testing feed data controller", async() => {
        const resp = mockResponse()
        await feedData.getAllFeedData({}, resp);
        expect(resp.status).toHaveBeenCalledWith(200);
    });
});


describe("Testing POST controllers", () => {

    it("testing feed data controller without repeat", async() => {
        const req = mockRequest({
            "location": "Lake",
            "food": "Grapes",
            "foodKind": "Fruits",
            "ducksQuantity": 5,
            "foodQuantity": 10,
            "time": "23:05"
        });
        const res = mockResponse();
        const response = await feedData.addFeedData(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: "Success"
        });
        expect(addSchedule).not.toBeCalled();
    });

    it("testing feed data controller with repeat", async() => {
        const req = mockRequest({
            "location": "Lake",
            "food": "Grapes",
            "foodKind": "Fruits",
            "ducksQuantity": 5,
            "foodQuantity": 10,
            "time": "23:05",
            "repeat": "MON,SAT"
        });
        const res = mockResponse();
        const response = await feedData.addFeedData(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: "Success"
        });
        expect(addSchedule).toBeCalled();
    });
});


describe("Testing throw errors", () => {
    beforeAll(() => {
        Location.findOrCreate = jest
            .fn()
            .mockImplementationOnce(() => {
                throw new Error("mock error");
            });

        Food.findOrCreate = jest
            .fn()
            .mockImplementationOnce(() => {
                throw new Error("mock error");
            });

        FoodKind.findOrCreate = jest
            .fn()
            .mockImplementationOnce(() => {
                throw new Error("mock error");
            });
    })

    it("test whether location is throwing error if anything goes wrong", async() => {
        expect(async() => {
            await feedData.findOrCreateLocation("Lake")
        }).rejects.toThrowError("mock error");

    });

    it("test whether location is throwing error if anything goes wrong", async() => {
        expect(async() => {
            await feedData.findOrCreateFood("Grapes")
        }).rejects.toThrowError("mock error");

    });

    it("test whether location is throwing error if anything goes wrong", async() => {
        expect(async() => {
            await feedData.findOrCreateFoodKind("Fruits")
        }).rejects.toThrowError("mock error");

    });

});