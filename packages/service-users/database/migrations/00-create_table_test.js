module.exports = {
  up: (queryInterface) =>
    queryInterface.sequelize.query(/* sql */ `
        -- Table Definition ----------------------------------------------

        CREATE TABLE users (
            id uuid PRIMARY KEY,
            email varchar(255) NOT NULL,
            first_name varchar(255) NOT NULL,
            last_name varchar(255) NOT NULL,
            phone_number varchar(255) NOT NULL,
            job_name varchar(255),
            age integer,
            sponsor_id varchar(255),
            created_at timestamp with time zone NOT NULL,
            updated_at timestamp with time zone NOT NULL
        );
      `),
  down: (queryInterface) => queryInterface.sequelize.query(/* sql */ 'DROP TABLE products'),
};
