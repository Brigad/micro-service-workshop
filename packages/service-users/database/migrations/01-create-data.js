module.exports = {
  up: (queryInterface) =>
    queryInterface.sequelize.query(/* sql */ `
        -- Table Definition ----------------------------------------------

        INSERT INTO users ("email","first_name","last_name","phone_number","id","created_at","updated_at")
          VALUES
            ('toto@gmail.com','Toto','Le rigolo','+33 6 78 65 92 59',E'f43fcefe-e0c1-4078-bd46-9b537b9c07c4', NOW(), NOW()),
            ('michel@michel.com','Michel','Michel','+33 6 12 45 92 59',E'7db6e12d-a19c-4e1b-a384-525dbe34465f', NOW(), NOW()),
            ('gabriel.beck@yahoo.com','Gabriel','Beck','+33 6 78 94 34 57',E'778a3f49-84a9-47cc-b77e-12f091aed420', NOW(), NOW()),
            ('donald@wanadoo.fr','Donald','Duckinson','+33 6 78 65 09 00',E'3b03ae02-29ae-4fe2-8641-8d27340cbfe5', NOW(), NOW()),
            ('russsam@gmail.com','Samual','Russo','+33 6 78 65 12 76',E'aa207a47-034c-4d32-9e63-65a0315d81c4', NOW(), NOW()),
            ('chad@gmail.com','Chad','Vega','+33 6 40 78 92 59',E'58d7cd31-0aa0-43e1-9e3a-4152b1c0fb7b', NOW(), NOW())
      `),
};
