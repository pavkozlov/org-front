export default function ({ app, redirect }) {

    if (!app.store.getters.GET_AUTH) {
        return redirect('/login')
    }
}
