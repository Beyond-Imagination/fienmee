import EncryptedStorage from 'react-native-encrypted-storage'

const TOKEN_KEY = 'jwt'

export async function setToken(token: string): Promise<void> {
    try {
        await EncryptedStorage.setItem(TOKEN_KEY, token)
    } catch (error) {
        // TODO: token 저장시 에러 발생 케이스. 호출한 곳에서 모바일 에러 페이지로 이동
        throw error
    }
}

export async function getToken(): Promise<string> {
    let token: string | null = null
    try {
        token = await EncryptedStorage.getItem(TOKEN_KEY)
    } catch (error) {
        // TODO: token 불러오는 중 에러 발생 케이스. 호출한 곳에서 모바일 에러 페이지로 이동
        throw error
    }

    if (!token) {
        // TODO: token 없음. 호출한 곳에서 로그인 페이지로 이동
        throw new Error()
    }

    return token
}

export async function deleteToken(): Promise<void> {
    try {
        await EncryptedStorage.removeItem(TOKEN_KEY)
    } catch (error) {
        // TODO: token 삭제 실패. 호출한 곳에서 모바일 에러 페이지로 이동
        throw error
    }
}
