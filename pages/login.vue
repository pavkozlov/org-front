<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Login form</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="credentials.username"
          label="Имя пользователя"
          name="login"
          prepend-icon="mdi-account"
          type="text"
        />

        <v-text-field
          id="password"
          v-model="credentials.password"
          label="Пароль"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="login()">Войти</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: "login",
  data: () => ({
    credentials: {
      username: "",
      password: ""
    },
    usernameRules: [v => !!v || "Введите логин"],
    passwordRules: [v => !!v || "Введите пароль"]
  }),

  methods: {
    login() {
      this.$axios
        .post("/user/login", {
          username: this.credentials.username,
          password: this.credentials.password
        })
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
          );
          this.$router.push("/");
          this.$axios.get("/user/me").then(resp => {
            this.$auth.setUser(resp.data);
            this.$router.push("/");
          });
        });
    }
  }
};
</script>
