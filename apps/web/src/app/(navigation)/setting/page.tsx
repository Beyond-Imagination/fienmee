'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import SettingItem from '@/components/settings/settingItem'
import { DeleteAccountIcon, EnquiryIcon, LogoutIcon, PrivacyPolicyIcon, ServiceTermIcon, SmileIcon } from '@/components/icon'
import { logout } from '@/api/user'
import DeleteAccountModal from '@/components/settings/deleteAcccountModal'
import { requestLogout } from '@/hooks/bridges'

export default function Setting() {
    const userNickname = 'user1' // TODO: get user info
    const [isDeleteModal, onDeleteModalClose] = useState<boolean>(false)

    // TODO: add onClick action
    const logoutQuery = useMutation({
        mutationFn: () => {
            return logout()
        },
        onSuccess: () => {
            sessionStorage.removeItem('access_token')
            requestLogout()
        },
    })
    const logoutToggle = () => {
        logoutQuery.mutate()
    }
    return (
        <div className="flex flex-col justify-items-center min-h-[80vh] px-8 mt-6">
            <div className="grid justify-items-center border-b gap-10 w-full py-8 border-gray-300">
                <div className="flex flex-row justify-between items-center w-11/12">
                    <span className="text-3xl text-left">
                        안녕하세요 👋 <br />
                        {userNickname}님
                    </span>
                    <SmileIcon width="6.25rem" height="6.25rem" />
                </div>
                <button className="rounded-lg h-12 w-3/4 text-white bg-[#FF9575] py-3">프로필 수정</button>
            </div>
            <div className="grid border-b gap-4 w-full py-8 border-gray-300">
                <SettingItem text="서비스 이용약관">
                    <ServiceTermIcon height="2rem" width="2rem" />
                </SettingItem>
                <SettingItem text="개인정보 처리방침">
                    <PrivacyPolicyIcon height="2rem" width="2rem" />
                </SettingItem>
                <SettingItem text="문의하기">
                    <EnquiryIcon height="2rem" width="2rem" />
                </SettingItem>
            </div>
            <div className="grid gap-4 w-full py-8">
                <SettingItem text="로그아웃" onClick={logoutToggle}>
                    <LogoutIcon width="2rem" height="2rem" />
                </SettingItem>
                <SettingItem text="회원 탈퇴" onClick={() => onDeleteModalClose(true)}>
                    <DeleteAccountIcon width="2rem" height="2rem" />
                </SettingItem>
            </div>
            <DeleteAccountModal isOpen={isDeleteModal} onClose={() => onDeleteModalClose(false)} />
        </div>
    )
}
