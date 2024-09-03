const {Model, DataTypes, Sequelize} = require('sequelize')
const { CUSTOMER_TABLE } = require('./customer.model')

const ORDER_TABLE = 'orders'

const OrderSchema = {
  id : {
    allowNull: false, // No permitir valores nulos
    autoIncrement: true, // Incrementar automáticamente
    primaryKey: true,
    type: DataTypes.INTEGER // Dato tipo entero
  },
  
  createdAt: {
    allowNull: false, // No permitir valores nulos
    type: DataTypes.DATE, // Dato tipo date
    field: 'created_at', // Definimos cómo queremos que aparezca este campo en la base de datos
    defaultValue: DataTypes.NOW // Por defecto se define la hora y la fecha en la que estamos ingresando los datos
  },
  customerId: { 
    field: 'customer_id', 
    allowNull: false, 
    type: DataTypes.INTEGER, 
    //unique: true, ya no será único
    /* 
    COmo es una foreign key, tenemos que indicarle que queremos que se asocie a
    la tabla de usuario
    */
    references: { 
        model: CUSTOMER_TABLE, 
        key: 'id' 
    }, 
    /* 
    También debemos decir qué queremos que pase cuando hacemos una actualización. En este caso querermos que se haga una actualizacón en CASCADA.
    */
    onUpdate: 'CASCADE',
    /* 
    Y si se elimina una fila, el siguiente comportamiento
    */
    onDelete: 'SET NULL' 
  },
  total: {
    type: DataTypes.VIRTUAL, // campo virtual, no aparecerá en insomis
    get() {
      if (this.items.length > 0) {
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount)
        }, 0)
      }
      return 0
    }
  }
}

class Order extends Model {
  static associate(models) {
    // models
    this.belongsTo(models.Customer, 
        // le asigno un alias
      {as: 'customer'}
    )
    this.belongsToMany(models.Product, {
        as: 'items',
        through: models.OrderProduct,
        foreignKey: 'orderId',
        otherKey: 'productId'
    })
  }

  // Método para hacer la configuración del modelo.
  // Lepasamos la conexión como parámetro
  static config(sequelize) {    
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false // No permite la creación de campos por defecto
    }
  }
}

module.exports = {ORDER_TABLE, OrderSchema, Order}
