import EncryptedStorage from 'react-native-encrypted-storage'

import { ICredential } from '@fienmee/types'

const TOKEN_KEY = 'jwt'

export async function setToken(token: ICredential): Promise<void> {
    try {
        await EncryptedStorage.setItem(TOKEN_KEY, JSON.stringify(token))
    } catch (error) {
        // TODO: token 저장시 에러 발생 케이스. 호출한 곳에서 모바일 에러 페이지로 이동
        throw error
    }
}

export async function getToken(): Promise<ICredential> {
    let credential: ICredential
    let credentialString: string | null = null
    try {
        credentialString = await EncryptedStorage.getItem(TOKEN_KEY)
    } catch (error) {
        // TODO: token 불러오는 중 에러 발생 케이스. 호출한 곳에서 모바일 에러 페이지로 이동
        throw error
    }

    if (!credentialString) {
        // TODO: token 없음. 호출한 곳에서 로그인 페이지로 이동
        throw new Error()
    }

    credential = JSON.parse(credentialString)

    return credential
}

export async function deleteToken(): Promise<void> {
    try {
        await EncryptedStorage.removeItem(TOKEN_KEY)
    } catch (error) {
        // TODO: token 삭제 실패. 호출한 곳에서 모바일 에러 페이지로 이동
        throw error
    }
}
