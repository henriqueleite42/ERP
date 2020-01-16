const Sequelize = require('sequelize');
const DbConfig = require('Config/dbConfig');

const connection = new Sequelize(DbConfig.db, DbConfig.user, DbConfig.pass);

const PriceList = connection.define('price_list', {
    name: {
        type: Sequelize.STRING,
        validate: {
            isEven: function(value) {
                PriceList.findOne({where: {name: value}}).then((pl) => {
                    if (pl != null) {
                        throw new Error('There is already a Price Table with this name.');
                    }
                })
            }
        }
    },
    groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isEven: function(value) {
                Users.findOne({where: {id: value}}).then((user) => {
                    if (user == null) {
                        throw new Error('No Users associated with Price List.');
                    }
                })
            }
        }
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    }
})