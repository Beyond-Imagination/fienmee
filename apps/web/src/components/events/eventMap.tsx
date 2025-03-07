import { Map, MapMarker } from 'react-kakao-maps-sdk'

export interface Props {
    lng: number
    lat: number
}

export function EventMap({ lng, lat }: Props) {
    return (
        <Map center={{ lat: lat, lng: lng }} style={{ width: '100%', height: '12.5rem' }}>
            <MapMarker position={{ lat: lat, lng: lng }} />
        </Map>
    )
}
