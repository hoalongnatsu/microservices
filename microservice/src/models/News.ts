import {
	DataTypes,
	Model,
	Optional,
	Sequelize,
} from "sequelize";

import { Context } from "moleculer";
import { initModel } from "Utils/model";

export interface NewsAttributes {
	id: number;
	image_sm: string;
	image_lg: string;
	title: string;
	slug: string;
	description: string;
	body: string;
	status: number;
	published_at: Date;
	created_at: Date;
	updated_at: Date;
}

type NewsCreationAttributes = Optional<
	NewsAttributes,
	"id" | "image_lg" | "status" | "published_at" | "created_at" | "updated_at"
>;

export class News
	extends Model<NewsAttributes, NewsCreationAttributes>
	implements NewsAttributes
{
	public id!: number;
	public user_id!: string;
	public image_sm!: string;
	public image_lg!: string;
	public title!: string;
	public slug!: string;
	public description!: string;
	public body!: string;
	public status!: number;
	public published_at!: Date;

	public readonly created_at!: Date;
	public readonly updated_at!: Date;
}

export const NewsModel = (ctx: Context<any, any>) => {
	initModel<NewsAttributes>(
		News,
		{
			id: {
				type: DataTypes.INTEGER,
        primaryKey: true,
				autoIncrement: true,
			},
			image_sm: {
        type: DataTypes.STRING,
      },
			image_lg: {
        type: DataTypes.STRING,
      },
			title: {
        type: DataTypes.STRING,
      },
			slug: {
        type: DataTypes.STRING,
				unique: true,
      },
			description: {
        type: DataTypes.STRING,
      },
			body: {
        type: DataTypes.TEXT,
      },
			status: {
        type: DataTypes.INTEGER,
      },
			published_at: {
        type: DataTypes.DATE,
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
		"news",
		ctx
	);

	return News;
};
