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

class CategoryService implements ServiceSchema {
	public name = "categories";
	public hooks = Hooks();

	@Action({
		rest: "GET /",
	})
	public async list(ctx: Context<any, any>): Promise<any> {
		const { pageIndex, pageSize, filters, sorter } = ctx.params;

    try {
      const Category = Models.CategoryModel(ctx);
      const categories = findAndCountAll(
        Category,
        {
          pageIndex,
          pageSize,
          filters,
          sorter,
          ctx,
        }
      );

      return categories;
    } catch (error) {
      throw apiResponseError(error);
    }
	}

  @Action({
		rest: "POST /",
	})
  public async create(ctx: Context<any, any>): Promise<any> {
    const { name, type } = ctx.params;

    try {
      const Category = Models.CategoryModel(ctx);
      const category = await Category.create({
        name,
        type,
      });

      return category;
    } catch (error) {
      throw apiResponseError(error);
    }
	}

  @Action({
		rest: "PUT /",
	})
  public async update(ctx: Context<any, any>): Promise<any> {
    const { id, entity } = ctx.params;

    const Category = Models.CategoryModel(ctx);
    const category = await Category.findByPk(id);

    if (!category) {
      throw apiResponseNotFoundError("Category not found!");
    }

    try {
      await category.update(entity, { fields: ["name"] });

      return category;
    } catch (error) {
      throw apiResponseError(error);
    }
	}

}

module.exports = new CategoryService();
