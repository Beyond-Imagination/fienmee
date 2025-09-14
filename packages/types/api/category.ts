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

export const categoryMapTourCodeToCode = {
    EV010100: CategoryCode.ARTS, // 문화관광축제
    EV010200: CategoryCode.ARTS, // 문화예술축제
    EV010300: CategoryCode.FOOD_DRINKS, // 지역특산물축제
    EV010400: CategoryCode.OTHERS, // 전통역사 축제
    EV010500: CategoryCode.NATURE_OUTDOORS, // 생태자연축제
    EV010600: CategoryCode.OTHERS, // 기타 축제
    EV020100: CategoryCode.ARTS, // 전통공연
    EV020200: CategoryCode.ARTS, // 연극
    EV020300: CategoryCode.MUSIC, // 뮤지컬
    EV020400: CategoryCode.MUSIC, // 오페라
    EV020500: CategoryCode.MUSIC, // 무용
    EV020600: CategoryCode.MUSIC, // 클래식음악회
    EV020700: CategoryCode.MUSIC, // 대중콘서트
    EV020800: CategoryCode.MOVIE_TV, // 영화
    EV020900: CategoryCode.OTHERS, // 기타 공연
    EV021000: CategoryCode.ARTS, // 넌버벌
    EV030100: CategoryCode.ARTS, // 전시회
    EV030200: CategoryCode.OTHERS, // 박람회
    EV030300: CategoryCode.SPORTS, // 스포츠경기
    EV030400: CategoryCode.OTHERS, // 기타행사
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
