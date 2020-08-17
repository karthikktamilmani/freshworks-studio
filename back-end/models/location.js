const { Sequelize, DataTypes } = require('sequelize');

const Location = sequelize.define('Location', {
    LOCATION: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Location;