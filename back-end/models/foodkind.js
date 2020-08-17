const { Sequelize, DataTypes } = require('sequelize');

const FoodKind = sequelize.define('FoodKind', {
    FOOD_KIND: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = FoodKind;