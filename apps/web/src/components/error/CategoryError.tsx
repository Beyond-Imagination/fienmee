import React from 'react'

const CategoryError: React.FC = () => {
    return (
        <div className="max-w-xs mx-auto text-center bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700">카테고리를 불러오는 데 실패했습니다. 다시 시도해 주세요.</p>
        </div>
    )
}

export default CategoryError
