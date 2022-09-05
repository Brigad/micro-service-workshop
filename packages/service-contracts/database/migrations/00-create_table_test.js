module.exports = {
  up: (queryInterface) =>
    queryInterface.sequelize.query(/* sql */ `
        -- Table Definition ----------------------------------------------
      `),
  down: (queryInterface) => queryInterface.sequelize.query(/* sql */ ''),
};
