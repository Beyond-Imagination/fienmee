import React, { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

interface EventVenueSelectorProps {
    initialPosition: { lat: number; lng: number }
    initialAddress: string
    onPositionChange: (position: { lat: number; lng: number }) => void
    onAddressChange: (address: string) => void
}

interface PlaceResult {
    place_name: string
    address_name: string
    x: string
    y: string
}

const EventVenueSelector: React.FC<EventVenueSelectorProps> = ({ initialPosition, initialAddress, onPositionChange, onAddressChange }) => {
    const [position, setPosition] = useState(initialPosition)
    const [address, setAddress] = useState(initialAddress ?? '')
    const [places, setPlaces] = useState<PlaceResult[]>([])
    const [isSelecting, setIsSelecting] = useState<boolean>(true)

    useEffect(() => {
        if (isSelecting) {
            return setIsSelecting(false)
        }

        if (address.trim() === '') return setPlaces([])

        const debounceTimer = setTimeout(() => {
            const ps = new kakao.maps.services.Places()
            ps.keywordSearch(address, (data, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    setPlaces(data as PlaceResult[])
                } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                    setPlaces([
                        {
                            place_name: '장소 검색 결과가 존재하지 않습니다.',
                            address_name: '',
                            x: '0',
                            y: '0',
                        },
                    ])
                } else if (status === kakao.maps.services.Status.ERROR) {
                    setPlaces([
                        {
                            place_name: '장소 검색 중 오류가 발생했습니다.',
                            address_name: '',
                            x: '0',
                            y: '0',
                        },
                    ])
                }
            })
        }, 500)
        return () => {
            clearTimeout(debounceTimer)
        }
    }, [address])

    const handleMapClick = (_: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
        setIsSelecting(true)

        const newPosition = {
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
        }
        setPosition(newPosition)
        onPositionChange(newPosition)

        const geocoder = new kakao.maps.services.Geocoder()
        geocoder.coord2Address(newPosition.lng, newPosition.lat, (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const target = data[0]
                const addressText = target.address.address_name
                setAddress(addressText)
                onAddressChange(addressText)
                setPlaces([])
            } else {
                setAddress('')
                onAddressChange('')
                setPlaces([
                    {
                        place_name: '지정된 좌표에 주소 정보를 찾을 수 없습니다.',
                        address_name: '',
                        x: '0',
                        y: '0',
                    },
                ])
            }
        })
    }

    const handleSelectPlace = (place: PlaceResult) => {
        if (place.address_name === '' && place.x === '0' && place.y === '0') return

        setIsSelecting(true)

        const newPosition = {
            lat: parseFloat(place.y),
            lng: parseFloat(place.x),
        }
        setPosition(newPosition)
        onPositionChange(newPosition)
        onAddressChange(place.place_name)
        setAddress(`${place.place_name}(${place.address_name})`)
        setPlaces([])
    }

    return (
        <div className="flex flex-col w-full pt-2 gap-4">
            <label className="block text-base font-medium mb-2">행사 장소</label>
            <div className="relative">
                <div className="h-10 w-full rounded-lg px-4 py-2" />
                <div className="absolute border rounded-lg w-full top-0 z-10">
                    <input
                        className="w-full rounded-lg px-4 py-2 focus:outline-none"
                        type="text"
                        name="address"
                        value={address}
                        onChange={({ target }) => setAddress(target.value)}
                        placeholder="장소를 입력해주세요"
                    />
                    {places.length > 0 && (
                        <ul className="w-full bg-white rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
                            {places.map((place, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                                    onClick={() => handleSelectPlace(place)}
                                >
                                    <div className="font-semibold">{place.place_name}</div>
                                    <div className="text-sm text-gray-500">{place.address_name}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <Map center={position} style={{ width: '100%', height: '200px' }} level={4} onClick={handleMapClick}>
                <MapMarker position={position} />
            </Map>
        </div>
    )
}

export default EventVenueSelector
