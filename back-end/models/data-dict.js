const { Sequelize, DataTypes } = require('sequelize');

const Location = sequelize.define('Location', {
    // Model attributes are defined here
    // LOCATION_ID: {
    //     primaryKey: true,
    //     type: Sequelize.UUID,
    //     defaultValue: Sequelize.UUIDV4,
    //     unique: true
    // },
    LOCATION: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Food = sequelize.define('Food', {
    // FOOD_ID: {
    //     primaryKey: true,
    //     type: Sequelize.UUID,
    //     defaultValue: Sequelize.UUIDV4
    // },
    FOOD: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const FoodKind = sequelize.define('FoodKind', {
    // FOOD_KIND_ID: {
    //     primaryKey: true,
    //     type: Sequelize.UUID,
    //     defaultValue: Sequelize.UUIDV4
    // },
    FOOD_KIND: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const FeedData = sequelize.define('FeedData', {
    LocationId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Locations',
            key: 'id',
        }
    },
    FoodId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Food',
            key: 'id',
        }
    },
    FoodKindId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'FoodKinds',
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

Location.hasMany(FeedData);
FoodKind.hasMany(FeedData);
Food.hasMany(FeedData);

sequelize.sync({ alter: true, force: true }).then(() => {
    console.log("All models were synchronized successfully.");
}).catch((err) => {
    console.log(`Error while synchronizing tables ${err}`)
})

module.exports = { Location, Food, FoodKind, FeedData };