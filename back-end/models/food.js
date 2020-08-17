const { Sequelize, DataTypes } = require('sequelize');

const Food = sequelize.define('Food', {
    FOOD: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Food;