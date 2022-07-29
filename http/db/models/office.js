'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class office extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      office.hasMany(models.office_worker);
    }
  }
  office.init({
    name: DataTypes.STRING,
    coords: DataTypes.STRING,
    full_address: DataTypes.STRING,
    work_time: DataTypes.STRING,
    title: DataTypes.STRING,
    country: DataTypes.STRING,
    province: DataTypes.STRING,
    area: DataTypes.STRING,
    locality: DataTypes.STRING,
    district: DataTypes.STRING,
    house: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    reason: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'office',
    underscored: true,
  });
  return office;
};