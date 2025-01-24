import { isErrorResponse } from './errors'

describe('isErrorResponse', () => {
    it('return false with null', () => {
        expect(isErrorResponse(null)).toBeFalsy()
    })

    it('return false with undefined', () => {
        expect(isErrorResponse(undefined)).toBeFalsy()
    })

    it('return false with an empty object', () => {
        expect(isErrorResponse({})).toBeFalsy()
    })

    it('return false with an object only has code', () => {
        expect(isErrorResponse({ code: 1 })).toBeFalsy()
    })

    it('return false with an object only has message', () => {
        expect(isErrorResponse({ message: 'message' })).toBeFalsy()
    })

    it('return false with an object has invalid type code', () => {
        expect(isErrorResponse({ code: '1', message: 'message' })).toBeFalsy()
    })

    it('return false with an object has invalid type message', () => {
        expect(isErrorResponse({ code: 1, message: 1 })).toBeFalsy()
    })

    it('return true with an IErrorResponse object', () => {
        expect(isErrorResponse({ code: 1, message: 'message' })).toBeTruthy()
    })
})
