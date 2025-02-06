import mongoose from 'mongoose'
import { defaultClasses, getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose'

export class Category extends defaultClasses.TimeStamps {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true })
    public title: string

    @prop({ default: 'normal' })
    public type: string

    @prop({ required: true })
    public code: CategoryCode

    public toJSON(): object {
        return {
            _id: this._id,
            title: this.title,
        }
    }

    public static async initialize(this: ReturnModelType<typeof Category>) {
        for (const category of Object.keys(fixedCategory)) {
            const exists = await this.exists(fixedCategory[category])
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

    public static async getCategoriesByType(this: ReturnModelType<typeof Category>, type: string): Promise<Category[]> {
        return await this.find({ type: type }).exec()
    }
}

export const CategoryModel = getModelForClass(Category)

enum CategoryCode {
    MYEVENT = 1,
    HOTEVENT,
    GAME,
    TECHNOLOGY,
    MOVIE_TV,
    ANIME,
    ARTS,
    BUSINESS,
    COLLECTIBLES,
    EDUCATION,
    CAREER,
    FASHION_BEAUTY,
    FOOD_DRINKS,
    HOME,
    GARDEN,
    MUSIC,
    NATURE_OUTDOORS,
    SCIENCE,
    SPORTS,
    VEHICLES,
    WELLNESS,
    OTHERS,
}

const fixedCategory = {
    [CategoryCode.MYEVENT]: { title: '내가 등록한 행사', number: CategoryCode.MYEVENT, type: 'special' },
    [CategoryCode.HOTEVENT]: { title: '인기 행사', number: CategoryCode.HOTEVENT, type: 'special' },
    [CategoryCode.GAME]: { title: '게임', number: CategoryCode.GAME },
    [CategoryCode.TECHNOLOGY]: { title: '기술', number: CategoryCode.TECHNOLOGY },
    [CategoryCode.MOVIE_TV]: { title: '영화, 드라마', number: CategoryCode.MOVIE_TV },
    [CategoryCode.ANIME]: { title: '애니메이션', number: CategoryCode.ANIME },
    [CategoryCode.ARTS]: { title: '문화예술', number: CategoryCode.ARTS },
    [CategoryCode.BUSINESS]: { title: '비지니스, 창업', number: CategoryCode.BUSINESS },
    [CategoryCode.COLLECTIBLES]: { title: '팝업 행사', number: CategoryCode.COLLECTIBLES },
    [CategoryCode.EDUCATION]: { title: '교육', number: CategoryCode.EDUCATION },
    [CategoryCode.CAREER]: { title: '취업', number: CategoryCode.CAREER },
    [CategoryCode.FASHION_BEAUTY]: { title: '패션, 뷰티', number: CategoryCode.FASHION_BEAUTY },
    [CategoryCode.FOOD_DRINKS]: { title: '음식', number: CategoryCode.FOOD_DRINKS },
    [CategoryCode.HOME]: { title: '인테리어', number: CategoryCode.HOME },
    [CategoryCode.GARDEN]: { title: '정원', number: CategoryCode.GARDEN },
    [CategoryCode.MUSIC]: { title: '음악', number: CategoryCode.MUSIC },
    [CategoryCode.NATURE_OUTDOORS]: { title: '자연, 야외활동', number: CategoryCode.NATURE_OUTDOORS },
    [CategoryCode.SCIENCE]: { title: '과학', number: CategoryCode.SCIENCE },
    [CategoryCode.SPORTS]: { title: '스포츠', number: CategoryCode.SPORTS },
    [CategoryCode.VEHICLES]: { title: '모빌리티', number: CategoryCode.VEHICLES },
    [CategoryCode.WELLNESS]: { title: '건강', number: CategoryCode.WELLNESS },
    [CategoryCode.OTHERS]: { title: '기타', number: CategoryCode.OTHERS },
}
