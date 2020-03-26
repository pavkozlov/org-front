<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Login form</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field label="Имя пользователя" name="login" prepend-icon="mdi-account" type="text" />

        <v-text-field
          id="password"
          label="Пароль"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary">Войти</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: "login"
};
</script>
