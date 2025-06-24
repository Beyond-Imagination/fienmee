export enum CategoryCode {
    MYEVENT = 'MYEVENT',
    HOTEVENT = 'HOTEVENT',
    GAME = 'GAME',
    TECHNOLOGY = 'TECHNOLOGY',
    MOVIE_TV = 'MOVIE_TV',
    ANIME = 'ANIME',
    ARTS = 'ARTS',
    BUSINESS = 'BUSINESS',
    COLLECTIBLES = 'COLLECTIBLES',
    EDUCATION = 'EDUCATION',
    CAREER = 'CAREER',
    FASHION_BEAUTY = 'FASHION_BEAUTY',
    FOOD_DRINKS = 'FOOD_DRINKS',
    HOME = 'HOME',
    GARDEN = 'GARDEN',
    MUSIC = 'MUSIC',
    NATURE_OUTDOORS = 'NATURE_OUTDOORS',
    SCIENCE = 'SCIENCE',
    SPORTS = 'SPORTS',
    VEHICLES = 'VEHICLES',
    WELLNESS = 'WELLNESS',
    OTHERS = 'OTHERS',
}

export const categoryMapTitleToCode = {
    영화: CategoryCode.MOVIE_TV,
    연극: CategoryCode.ARTS,
    '전시/미술': CategoryCode.ARTS,
    '축제-문화/예술': CategoryCode.ARTS,
    '교육/체험': CategoryCode.EDUCATION,
    '축제-자연/경관': CategoryCode.NATURE_OUTDOORS,
    국악: CategoryCode.MUSIC,
    '독주/독창회': CategoryCode.MUSIC,
    '뮤지컬/오페라': CategoryCode.MUSIC,
    무용: CategoryCode.MUSIC,
    콘서트: CategoryCode.MUSIC,
    클래식: CategoryCode.MUSIC,
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
}

export interface IGetEventCategoriesResponse {
    defaultCategories: ICategory[]
    categories: ICategory[]
    favoriteCategories: ICategory[]
}
