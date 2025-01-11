import Script from 'next/script'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { KAKAO_API_KEY } from '../../../config'

export interface Props {
    lng: number
    lat: number
}

const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`

export function KakaoMap({ lng, lat }: Props) {
    return (
        <>
            <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
            <Map center={{ lat: lat, lng: lng }} style={{ width: '100%', height: '200px' }}>
                <MapMarker position={{ lat: lat, lng: lng }} />
            </Map>
        </>
    )
}
