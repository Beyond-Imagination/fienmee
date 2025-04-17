export const ErrorConfig = {
    // seoul data = 5000
    SEOUL_DATA_SERVER: {
        statusCode: 500,
        errorCode: 5000,
        message: 'seoul data server error',
    },
    SEOUL_DATA_UPDATE: {
        statusCode: 500,
        errorCode: 5001,
        message: 'seoul data update error',
    },
    // kakao = 6000
    KAKAO_GET_USER_INFORMATION_FAILED: {
        statusCode: 500,
        errorCode: 6050,
        message: 'Failed to get kakao user information',
    },
    KAKAO_NETWORK_ACCESS_FAILED: {
        statusCode: 500,
        errorCode: 6051,
        message: 'Network error while accessing Kakao API',
    },
    // auth/oauth = 4100
    USER_NOT_FOUND: {
        statusCode: 404,
        errorCode: 4100,
        message: 'unknown user error',
    },

    USER_ALREADY_DELETED: {
        statusCode: 404,
        errorCode: 4101,
        message: 'deleted user error',
    },

    OAUTH_PROVIDER_NOT_FOUND: {
        statusCode: 404,
        errorCode: 4102,
        message: 'unknown oauth provider error',
    },
    // auth/jwt = 4000
    TOKEN_UNAUTHORIZED: {
        statusCode: 401,
        errorCode: 4010,
        message: 'Unauthorized Token',
    },

    REQUEST_TOKEN_INVALID: {
        statusCode: 400,
        errorCode: 4000,
        message: 'invalid request token',
    },

    TOKEN_TYPE_INVALID: {
        statusCode: 400,
        errorCode: 4011,
        message: 'invalid token type',
    },
    // server = 500
    INTERNAL_SERVER_ERROR: {
        statusCode: 500,
        errorCode: 500,
        message: 'internal server error',
    },
    // schedule = 7000
    SCHEDULE_UNAUTHORIZED: {
        statusCode: 401,
        errorCode: 7000,
        message: 'unauthorized schedule',
    },
    REQUEST_FORMAT_INVALID: {
        statusCode: 400,
        errorCode: 7001,
        message: 'invalid request format',
    },
} as const

export type ErrorConfigKey = keyof typeof ErrorConfig
