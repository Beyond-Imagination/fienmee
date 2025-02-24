import fetchIntercept from 'fetch-intercept'

import { requestRefresh } from '@/hooks/bridges'
import { TOKEN_REFRESH_BUFFER } from '@/config'

fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        const tokenExpiresAtString = sessionStorage.getItem('access_token_expires_at')
        if (!tokenExpiresAtString) {
            return [url, config]
        }

        const now = new Date()
        const tokenExpiresAt = new Date(tokenExpiresAtString)

        if (tokenExpiresAt.getTime() - now.getTime() < TOKEN_REFRESH_BUFFER * 1000) {
            requestRefresh()
        }

        return [url, config]
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error)
    },

    response: function (response) {
        // Modify the reponse object
        return response
    },

    responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error)
    },
})
