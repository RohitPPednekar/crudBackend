

module.exports = function(sequelize, DataTypes) {
  var product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING(100),
},
{
    classMethods: {
    	testfunction: function() {
            var query = '';
            query +='SELECT * from product'
            
            return sequelize.query(query, { type: sequelize.QueryTypes.SELECT});
        },
        
    }
});

    product.belongsTo(sequelize.models.category, {foreignKey: 'category_id'});
    return product;
};
