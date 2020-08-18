const FeedData = require("./feeddata");
const Location = require("./location");
const Food = require("./food");
const FoodKind = require("./foodkind");

FeedData.belongsTo(Location, { foreignKey: "LOCATION_ID" });
FeedData.belongsTo(FoodKind, { foreignKey: "FOOD_KIND_ID" });
FeedData.belongsTo(Food, { foreignKey: "FOOD_ID" });
Location.hasMany(FeedData, { foreignKey: "LOCATION_ID" });
FoodKind.hasMany(FeedData, { foreignKey: "FOOD_KIND_ID" });
Food.hasMany(FeedData, { foreignKey: "FOOD_ID" });
// { alter: true, force: true }
sequelize.sync().catch((err) => {
    console.log(`Error while synchronizing tables ${err}`)
})

module.exports = { Location, FeedData, Food, FoodKind };