import config from 'react-native-config'

export const ENV = config.ENV === 'develop'

export const BE_URL = config.BE_URL
export const FE_URL = config.FE_URL

export const GOOGLE_CLIENT_ID = config.GOOGLE_CLIENT_ID
