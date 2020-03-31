const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
    return {
        auth: null
    }
}
export const mutations = {
    setAuth(state, auth) {
        state.auth = auth
    }
}
export const actions = {
    setAuth(context, auth) {
        context.commit('setAuth', auth);
    },
    nuxtServerInit({ commit }, { req, res, app }) {

        let auth = null
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                auth = JSON.parse(parsed.auth)
            } catch (err) {
                // No valid cookie found
            }
        }
        commit('setAuth', auth)
    }
}

export const getters = {
    GET_AUTH(state) {
        return state.auth
    }
} 