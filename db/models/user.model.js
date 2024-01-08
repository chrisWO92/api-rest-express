/*
Esquemas y modelos de Bases de Datos
*/

const {Model, DataTypes, Sequelize} = require('sequelize')

// normalmente se define el nombre en minúscula y en plural
const USER_TABLE = 'users'

// Definimos estructura de nuestra tabla.
// Definimos estructura de los campos.
// Al tener un modelo agnóstico de DB, nos permite usar estos esquemas en cualquier DB
// que estemos usando, ya sea MySQL, postgres, MariaDB, etc.
const UserSchema = {
  id: {
    allowNull: false, // No permitir valores nulos
    autoIncrement: true, // Incrementar automáticamente
    primaryKey: true,
    type: DataTypes.INTEGER // Dato tipo entero
  },
  email: {
    allowNull: false, // No permitir valores nulos
    type: DataTypes.STRING, // Dato tipo string
    unique: true // Campo único. Un sólo usuario por email
  },
  password: {
    allowNull: false, // No permitir valores nulos
    type: DataTypes.STRING, // Dato tipo string
  },
  createdAt: {
    allowNull: false, // No permitir valores nulos
    type: DataTypes.DATE, // Dato tipo date
    field: 'created_at', // Definimos cómo queremos que aparezca este campo en la base de datos
    defaultValue: Sequelize.NOW // Por defecto de define la hora y la fecha en la que estamos ingresando los datos
  }
}

// Definimos una clase que hereda métodos de Model (Sequelize).
// Heredará métodos como buscar, filtrar, y otras cosas, para que sea sencillo
// hacer queries
class User extends Model {
  // static sirve para no tener que declarar el objeto para invocar este método
  static associate() {
    // models
  }

  // Método para hacer la configuración del modelo.
  // Lepasamos la conexión como parámetro
  static config(sequelize) {
    // La configuración retorna lo siguiente:
    return {
      sequelize,
      tableName: USER_TABLE,
      model: 'User',
      timestamps: false // No permite la creación de campos por defecto
    }
  }

}

module.exports = {USER_TABLE, UserSchema, User}

