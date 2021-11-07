module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("news", {
      id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			image_sm: {
        type: Sequelize.STRING,
      },
			image_lg: {
        type: Sequelize.STRING,
      },
			title: {
        type: Sequelize.STRING,
      },
			slug: {
        type: Sequelize.STRING,
        unique: true,
      },
			description: {
        type: Sequelize.STRING,
      },
			body: {
        type: Sequelize.TEXT,
      },
			status: {
        type: Sequelize.INTEGER,
      },
			published_at: {
        type: Sequelize.DATE,
      },
      created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn("NOW"),
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn("NOW"),
			},
		}, {
			timestamps: false,
		});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("news");
  },
};
