import React, { useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

interface EventVenueSelectorProps {
    initialPosition: { lat: number; lng: number }
    onPositionChange: (position: { lat: number; lng: number }) => void
}

const EventVenueSelector: React.FC<EventVenueSelectorProps> = ({ initialPosition, onPositionChange }) => {
    const [position, setPosition] = useState(initialPosition)

    const handleMapClick = (_: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
        const newPosition = {
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
        }
        setPosition(newPosition)
        onPositionChange(newPosition)
    }

    return (
        <Map center={position} style={{ width: '100%', height: '200px' }} level={3} onClick={handleMapClick}>
            <MapMarker position={position} />
        </Map>
    )
}

export default EventVenueSelector
