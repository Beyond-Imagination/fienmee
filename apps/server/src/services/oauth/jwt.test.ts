import { InvalidRequestTokenError } from '@/types/errors/jwt/auth'
import { expireJwt, isTokenInBlackList } from '@/services/oauth/jwt'

describe('expireJwt는', () => {
    const case1 = 'mockJwt'
    const case2 = undefined
    const case3 = ''

    describe('accessToken이 주어진 상황에서', () => {
        it('blacklist에 성공적으로 access token을 등록한다', () => {
            expireJwt(case1)
            expect(isTokenInBlackList(case1)).toBeTruthy()
        })
    })

    describe('잘못된 입력 형식에 대해서', () => {
        it('error를 throw한다', () => {
            expect(() => expireJwt(case2)).toThrowError(InvalidRequestTokenError)
            expect(() => expireJwt(case3)).toThrowError(InvalidRequestTokenError)
        })
    })
})
