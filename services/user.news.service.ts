import * as Models from "Models";

import { Context, ServiceSchema } from "moleculer";
import {
	apiResponseError,
	apiResponseNotFoundError,
	apiResponseValidationError,
} from "Utils/response";

import { Action } from "moleculer-decorators";
import Hooks from "Hooks";
import { findAndCountAll } from "Utils/model";

class NewsService implements ServiceSchema {
	public name = "news";
	public hooks = Hooks();

	@Action({
		rest: "GET /",
	})
	public async list(ctx: Context<any, any>): Promise<any> {
		const { pageIndex, pageSize, filters, sorter } = ctx.params;
		const { id: user_id } = ctx.meta.user;

		try {
			const News = Models.NewsModel(ctx);
			const news = await findAndCountAll(News, {
				pageIndex,
				pageSize,
				filters,
				sorter,
				ctx,
				where: { user_id },
			});

			return news;
		} catch (error) {
			throw apiResponseError(error);
		}
	}

	@Action({
		rest: "POST /",
	})
	public async create(ctx: Context<any, any>): Promise<any> {
		const { image_sm, title, slug, description, body } = ctx.params;

		const News = Models.NewsModel(ctx);

		try {
			const news = await News.create({ image_sm, title, slug, description, body });

			return news;
		} catch (error) {
			if (
				error.original
					.toString()
					.includes("duplicate key value violates unique constraint")
			) {
				throw apiResponseValidationError("News title already exists!");
			}

			throw apiResponseError(error);
		}
	}

	@Action({
		rest: "PUT /publish",
		params: {
			news_id: "number",
		},
	})
	public async publish(ctx: Context<any, any>): Promise<any> {
		const { news_id } = ctx.params;

		const News = Models.NewsModel(ctx);
		const news = await News.findByPk(news_id);

		if (!news) {
			throw apiResponseNotFoundError("News not fond");
		}

		try {
			news.status = 1;
			await news.save({ fields: ["status"] });

			return news;
		} catch (error) {
			throw apiResponseError(error);
		}
	}

}

module.exports = new NewsService();
