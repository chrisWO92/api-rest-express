const {Model, DataTypes, Sequelize} = require('sequelize')

const CATEGORY_TABLE = 'categories'

const CategorySchema = {
  id: {
    allowNull: false, // No permitir valores nulos
    autoIncrement: true, // Incrementar automáticamente
    primaryKey: true,
    type: DataTypes.INTEGER // Dato tipo entero
  },
  name: {
    allowNull: false, // No permitir valores nulos
    type: DataTypes.STRING, // Dato tipo string
    unique: true // Campo único. Una categoría no se puede repetir.
  },
  createdAt: {
    allowNull: false, // No permitir valores nulos
    type: DataTypes.DATE, // Dato tipo date
    field: 'created_at', // Definimos cómo queremos que aparezca este campo en la base de datos
    defaultValue: DataTypes.NOW // Por defecto se define la hora y la fecha en la que estamos ingresando los datos
  },
  image: {
    allowNull: false, // No permitir valores nulos
    type: DataTypes.STRING, // Dato tipo booleano
  }
}

class Category extends Model {
  static associate(models) {
    // models
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId'
    })
  }

  // Método para hacer la configuración del modelo.
  // Lepasamos la conexión como parámetro
  static config(sequelize) {
    // La configuración retorna lo siguiente:
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false // No permite la creación de campos por defecto
    }
  }
}

module.exports = {CATEGORY_TABLE, CategorySchema, Category}
