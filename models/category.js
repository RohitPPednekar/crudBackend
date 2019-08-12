

module.exports = function(sequelize, DataTypes) {
  var category = sequelize.define("category", {
    name: DataTypes.STRING(100),
},
{
    classMethods: {
    	testfunction: function() {
            var query = '';
            query +='SELECT * from category'
            
            return sequelize.query(query, { type: sequelize.QueryTypes.SELECT});
        },
        
    }
});

    
    return category;
};
