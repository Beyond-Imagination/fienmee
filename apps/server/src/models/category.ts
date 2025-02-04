import mongoose from 'mongoose'
import { defaultClasses, getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose'

export class Category extends defaultClasses.TimeStamps {
    public _id: mongoose.Types.ObjectId

    @prop({ require: true })
    public title: string

    @prop({ default: 'normal' })
    public type: string

    public toJSON(): object {
        return {
            _id: this._id,
            title: this.title,
        }
    }

    public static async initialize(this: ReturnModelType<typeof Category>) {
        for (const category of fixedCategory) {
            const exists = await this.exists(category)
            if (!exists) {
                await this.create(category)
            }
        }
    }

    public static async getCategoryById(this: ReturnModelType<typeof Category>, id: string): Promise<Category> {
        return await this.findOne({ _id: id }).exec()
    }

    public static async getCategoryByTitle(this: ReturnModelType<typeof Category>, title: string): Promise<Category> {
        return await this.findOne({ title: title }).exec()
    }

    public static async getCategoriesByType(this: ReturnModelType<typeof Category>, type: string) {
        return await this.find({ type: type }).exec()
    }
}

export const CategoryModel = getModelForClass(Category)

const fixedCategory = [
    { title: '내가 등록한 행사', type: 'special' },
    { title: '인기 행사', type: 'special' },
    { title: '게임' },
    { title: '기술' },
    { title: '영화, 드라마' },
    { title: '애니메이션' },
    { title: '문화예술' },
    { title: '비지니스, 창업' },
    { title: '팝업 행사' },
    { title: '교육' },
    { title: '취업' },
    { title: '패션, 뷰티' },
    { title: '음식' },
    { title: '인테리어' },
    { title: '정원' },
    { title: '음악' },
    { title: '자연, 야외활동' },
    { title: '과학' },
    { title: '스포츠' },
    { title: '모빌리티' },
    { title: '건강' },
    { title: '기타' },
]
