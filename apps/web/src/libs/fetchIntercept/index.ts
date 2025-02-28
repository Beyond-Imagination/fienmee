import fetchIntercept from 'fetch-intercept'

import { requestRefresh } from '@/hooks/bridges'
import { TOKEN_REFRESH_BUFFER } from '@/config'

fetchIntercept.register({
    request: function (url, config) {
        const credentialString = sessionStorage.getItem('access-token-storage')
        if (!credentialString) {
            return [url, config]
        }

        const credential = JSON.parse(credentialString)

        const now = new Date()
        const tokenExpiresAt = new Date(credential.state.expiresAt)

        if (tokenExpiresAt.getTime() - now.getTime() < TOKEN_REFRESH_BUFFER * 1000) {
            requestRefresh()
        }

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credential.state.accessToken}`,
            Accept: 'application/json',
        }

        return [url, { headers, ...config }]
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
