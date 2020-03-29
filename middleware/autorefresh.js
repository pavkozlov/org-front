
export default function ({ store, route, redirect, app }) {

    const { $axios, $auth } = app

    if (store.getters.isAuthenticated) {

        let token = $auth.getToken('local')
        let expired = decodeToken(token).expired

        let refreshInterval = (expired * 1000 - Date.now()) * 0.75

        console.log(refreshInterval)

        if (refreshInterval < 10000 && refreshInterval > 0) {
            refreshInterval = 10000
        }
        if (refreshInterval < 0) {
            refreshInterval = (refreshTokenF($auth, $axios, token, refreshToken) * 1000 - Date.now()) * 0.75
            $auth.fetchUserOnce()
        }

    }

}

function refreshTokenF($auth, $axios, token, refreshToken) {

    store.dispatch('REFRESH_TOKEN');
    let _token = $auth.getToken('local')
    let _expired = decodeToken(_token).expired
    return _expired

}



function decodeToken(str) {
    str = str.split('.')[1]

    str = str.replace('/-/g', '+')
    str = str.replace('/_/g', '/')
    switch (str.length % 4) {
        case 0:
            break
        case 2:
            str += '=='
            break
        case 3:
            str += '='
            break
        default:
            throw new Error('Invalid token')
    }

    str = (str + '===').slice(0, str.length + (str.length % 4))
    str = str.replace(/-/g, '+').replace(/_/g, '/')

    str = decodeURIComponent(escape(Buffer.from(str, 'base64').toString('binary')))

    str = JSON.parse(str)
    return str
}