export default async function ({ app }) {

    if ((decodeToken(app.store.getters.GET_AUTH.accessToken) - Date.now() / 1000) < 300) {

        async function refresh() {
            return await app.$axios.post("/user/refresh", { refreshToken: app.store.getters.GET_AUTH.refreshToken })
        }

        let data = await refresh()

        app.$axios.setHeader("Authorization", "Bearer " + data.data.accessToken);
        app.store.dispatch("setAuth", data.data);
        app.$cookies.set('auth', app.store.getters.GET_AUTH)

    }

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
    return str.expired
}