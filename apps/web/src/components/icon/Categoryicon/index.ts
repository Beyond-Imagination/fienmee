import type { StaticImageData } from 'next/image'

import iconHealth from './건강.png'
import iconGame from './게임.png'
import iconScience from './과학.png'
import iconEducation from './교육.png'
import iconTechnology from './기술.png'
import iconOthers from './기타.png'
import iconMyEvent from './내가 등록한 행사.png'
import iconVehicles from './모빌리티.png'
import iconArts from './문화예술.png'
import iconBusiness from './비지니스, 창업.png'
import iconSports from './스포츠.png'
import iconAnime from './애니메이션.png'
import iconMovieTv from './영화, 드라마.png'
import iconFoodDrinks from './음식.png'
import iconMusic from './음악.png'
import iconHotEvent from './인기 행사.png'
import iconHome from './인테리어.png'
import iconNatureOutdoors from './자연, 야외활동.png'
import iconGarden from './정원.png'
import iconCareer from './취업.png'
import iconPopup from './팝업 행사.png'
import iconFashionBeauty from './패션, 뷰티.png'

export const CATEGORY_ICON: Record<string, StaticImageData> = {
    건강: iconHealth,
    게임: iconGame,
    과학: iconScience,
    교육: iconEducation,
    기술: iconTechnology,
    기타: iconOthers,
    '내가 등록한 행사': iconMyEvent,
    모빌리티: iconVehicles,
    문화예술: iconArts,
    '비지니스, 창업': iconBusiness,
    스포츠: iconSports,
    애니메이션: iconAnime,
    '영화, 드라마': iconMovieTv,
    음식: iconFoodDrinks,
    음악: iconMusic,
    '인기 행사': iconHotEvent,
    인테리어: iconHome,
    '자연, 야외활동': iconNatureOutdoors,
    정원: iconGarden,
    취업: iconCareer,
    '팝업 행사': iconPopup,
    '패션, 뷰티': iconFashionBeauty,
}
