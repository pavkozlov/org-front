import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

    mutations: {
        REFRESH_TOKEN() {
            this.$axios.post("/user/refresh", { "refreshToken": this.$auth.getRefreshToken("local") })
                .then(resp => {
                    this.$auth.setToken("local", "Bearer " + resp.data.accessToken);
                    this.$auth.setRefreshToken("local", resp.data.refreshToken);
                    this.$axios.setHeader(
                        "Authorization",
                        "Bearer " + resp.data.accessToken
                    );
                    this.$auth.ctx.app.$axios.setHeader(
                        "Authorization",
                        "Bearer " + resp.data.accessToken
                    )
                    // this.$router.push("/");
                }
                )
        }
    },
    actions: {
        REFRESH_TOKEN: (context) => {
            context.commit('REFRESH_TOKEN');
        },
    },

    getters: {
        isAuthenticated(state) {
            return state.auth.loggedIn
        },

        loggedInUser(state) {
            return state.auth.user
        }
    }
})

export default store