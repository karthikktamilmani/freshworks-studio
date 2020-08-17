const { Sequelize, DataTypes } = require('sequelize');

const Location = sequelize.define('Location', {
    LOCATION: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Food = sequelize.define('Food', {
    FOOD: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const FoodKind = sequelize.define('FoodKind', {
    FOOD_KIND: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const FeedData = sequelize.define('FeedData', {
    LOCATION_ID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Location',
            key: 'id',
        }
    },
    FOOD_ID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Food',
            key: 'id',
        }
    },
    FOOD_KIND_ID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'FoodKind',
            key: 'id',
        }
    },
    NUMBER_OF_DUCKS: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TIME: {
        type: DataTypes.TIME,
        allowNull: false
    },
    FOOD_QUANTITY: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

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

module.exports = { Location, Food, FoodKind, FeedData };