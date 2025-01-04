import { addToBlackList, isTokenInBlackList } from '@/utils/blacklist'
import { InvalidRequestTokenError } from '@/types/errors/jwt/auth'

describe('token blacklist은', () => {
    const case1 = { accessToken: 'mock', refreshToken: 'mock' }
    const case2 = { accessToken: 'mock' }
    const case3 = { refreshToken: 'mock' }
    const case4 = {}
    const case5 = undefined

    describe('accessToken, refreshToken이 주어진 상황에서', () => {
        it('blacklist에 성공적으로 2개의 토큰을 등록한다', () => {
            addToBlackList(case1)
            expect(isTokenInBlackList(case1)).toBeTruthy()
        })
    })

    describe('accessToken이 주어진 상황에서', () => {
        it('blacklist에 성공적으로 access token을 등록한다', () => {
            addToBlackList(case2)
            expect(isTokenInBlackList(case2)).toBeTruthy()
        })
    })

    describe('refreshToken이 주어진 상황에서', () => {
        it('blacklist에 성공적으로 refresh token을 등록한다', () => {
            addToBlackList(case3)
            expect(isTokenInBlackList(case3)).toBeTruthy()
        })
    })

    describe('잘못된 입력 형식에 대해서', () => {
        it('error를 throw한다', () => {
            expect(addToBlackList(case4)).toThrowError(InvalidRequestTokenError)
            expect(addToBlackList(case5)).toThrowError(InvalidRequestTokenError)
        })
    })
})
