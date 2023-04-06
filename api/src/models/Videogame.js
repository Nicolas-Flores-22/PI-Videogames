const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo Videogame
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
      //Definimos un setter personalizado
      set(value) {
        //Comprobamos si el valor que se le asigna es un array
        if (Array.isArray(value)) {
          //Si es así, convertimos en una cadena JSON utilizando JSON.stringify() antes de asignarlo a nuestra base de datos
          this.setDataValue('platforms', JSON.stringify(value));
        } else {
          this.setDataValue('platforms', value);
        }
      },
      //Definimos un getter personalizado
      get() {
        const value = this.getDataValue('platforms');
        if (value) {
          //Convertimos la cadena JSON, almacenada en nuestra base de datos, en un array utilizando el JSON.parse
          const parsedValue = JSON.parse(value);
          //Antes de retornar hacemos un join separando los elementos del array con el ' | '
          return parsedValue.join(' | ');
        }
        return value;
      }
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: { //launch_Date
      type: DataTypes.DATEONLY, //.DATE
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    timestamps: false,
  });
};
