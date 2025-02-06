export enum CategoryCode {
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

export const fixedCategory = {
    [CategoryCode.MYEVENT]: { title: '내가 등록한 행사', code: CategoryCode.MYEVENT, type: 'special' },
    [CategoryCode.HOTEVENT]: { title: '인기 행사', code: CategoryCode.HOTEVENT, type: 'special' },
    [CategoryCode.GAME]: { title: '게임', code: CategoryCode.GAME },
    [CategoryCode.TECHNOLOGY]: { title: '기술', code: CategoryCode.TECHNOLOGY },
    [CategoryCode.MOVIE_TV]: { title: '영화, 드라마', code: CategoryCode.MOVIE_TV },
    [CategoryCode.ANIME]: { title: '애니메이션', code: CategoryCode.ANIME },
    [CategoryCode.ARTS]: { title: '문화예술', code: CategoryCode.ARTS },
    [CategoryCode.BUSINESS]: { title: '비지니스, 창업', code: CategoryCode.BUSINESS },
    [CategoryCode.COLLECTIBLES]: { title: '팝업 행사', code: CategoryCode.COLLECTIBLES },
    [CategoryCode.EDUCATION]: { title: '교육', code: CategoryCode.EDUCATION },
    [CategoryCode.CAREER]: { title: '취업', code: CategoryCode.CAREER },
    [CategoryCode.FASHION_BEAUTY]: { title: '패션, 뷰티', code: CategoryCode.FASHION_BEAUTY },
    [CategoryCode.FOOD_DRINKS]: { title: '음식', code: CategoryCode.FOOD_DRINKS },
    [CategoryCode.HOME]: { title: '인테리어', code: CategoryCode.HOME },
    [CategoryCode.GARDEN]: { title: '정원', code: CategoryCode.GARDEN },
    [CategoryCode.MUSIC]: { title: '음악', code: CategoryCode.MUSIC },
    [CategoryCode.NATURE_OUTDOORS]: { title: '자연, 야외활동', code: CategoryCode.NATURE_OUTDOORS },
    [CategoryCode.SCIENCE]: { title: '과학', code: CategoryCode.SCIENCE },
    [CategoryCode.SPORTS]: { title: '스포츠', code: CategoryCode.SPORTS },
    [CategoryCode.VEHICLES]: { title: '모빌리티', code: CategoryCode.VEHICLES },
    [CategoryCode.WELLNESS]: { title: '건강', code: CategoryCode.WELLNESS },
    [CategoryCode.OTHERS]: { title: '기타', code: CategoryCode.OTHERS },
}

export interface ICategory {
    _id: string
    title: string
    code: CategoryCode
}

export interface IGetEventCategoriesResponse {
    defaultCategories: ICategory[]
    categories: ICategory[]
    favoriteCategories: ICategory[]
}
