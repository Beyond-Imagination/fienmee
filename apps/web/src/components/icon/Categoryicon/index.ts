import type { StaticImageData } from 'next/image'

import 문화행사 from './문화행사.png'
import 스포츠 from './스포츠.png'
import 야외활동 from './야외활동.png'
import 음악 from './음악.png'
import 취업 from './취업.png'
import 팝업행사 from './팝업행사.png'
import 패션 from './패션.png'

export const CATEGORY_ICON: Record<string, StaticImageData> = {
    문화행사,
    스포츠,
    야외활동,
    음악,
    취업,
    팝업행사,
    패션,
}
