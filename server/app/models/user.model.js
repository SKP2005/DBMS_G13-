module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      user_password: {
        type: Sequelize.STRING
      }
    });
  
    return User;
};