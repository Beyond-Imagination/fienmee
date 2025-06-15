import { defaultClasses, getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose'

import { CategoryCode, fixedCategory } from '@fienmee/types'

export class Category extends defaultClasses.TimeStamps {
    @prop({ required: true, type: String, enum: Object.values(CategoryCode) })
    public _id: string

    @prop({ required: true })
    public title: string

    @prop({ default: 'normal' })
    public type: string

    public toJSON(): object {
        return {
            _id: this._id,
            title: this.title,
            type: this.type,
        }
    }

    public static async initialize(this: ReturnModelType<typeof Category>) {
        for (const category of Object.keys(fixedCategory)) {
            const exists = await this.exists(fixedCategory[category])
            if (!exists) {
                await this.create({
                    _id: category,
                    ...fixedCategory[category],
                })
            }
        }
    }

    public static async getCategoryById(this: ReturnModelType<typeof Category>, id: string): Promise<Category> {
        return await this.findOne({ _id: id }).exec()
    }

    public static async getCategoryByTitle(this: ReturnModelType<typeof Category>, title: string): Promise<Category> {
        return await this.findOne({ title: title }).exec()
    }

    public static async getCategoriesByType(this: ReturnModelType<typeof Category>, type: string): Promise<Category[]> {
        return await this.find({ type: type }).exec()
    }
}

export const CategoryModel = getModelForClass(Category)
