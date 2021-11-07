import {
	Association,
	DataTypes,
	HasManyCountAssociationsMixin,
	HasManyGetAssociationsMixin,
	Model,
	Optional,
	Sequelize,
} from "sequelize";

import { Context } from "moleculer";
import { initModel } from "Utils/model";

export interface CategoryAttributes {
	id: number;
	name: string;
	image: string;
	type: string;
	created_at: Date;
	updated_at: Date;
}

type CategoryCreationAttributes = Optional<
	CategoryAttributes,
	"id" | "image" | "created_at" | "updated_at"
>;

export class Category
	extends Model<CategoryAttributes, CategoryCreationAttributes>
	implements CategoryAttributes
{

	public id!: number;
	public name!: string;
	public image!: string;
	public type!: string;

	public readonly created_at!: Date;
	public readonly updated_at!: Date;
}

export const CategoryModel = (ctx: Context<any, any>) => {
	initModel<CategoryAttributes>(
		Category,
		{
			id: {
				primaryKey: true,
				type: DataTypes.INTEGER,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			image: {
				type: DataTypes.STRING,
			},
			type: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn("NOW"),
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn("NOW"),
			},
		},
		"categories",
		ctx
	);

	return Category;
};
