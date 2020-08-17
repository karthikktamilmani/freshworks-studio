const { Sequelize, DataTypes } = require('sequelize');

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

module.exports = FeedData;