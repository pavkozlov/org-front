<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app color="primary" dark temporary>
      <template v-slot:prepend>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Organizer</v-list-item-title>
            <v-list-item-subtitle>Personal project</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <v-btn text @click="logout">Выйти</v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  data() {
    return {
      drawer: false,

      items: [
        {
          icon: "mdi-home",
          title: "Главная",
          to: "/"
        },
        {
          icon: "mdi-login",
          title: "Вход",
          to: "/login"
        }
      ],

      title: "Organizer"
    };
  },
  methods: {
    logout() {
      Cookie.remove("auth");
      this.$store.commit("setAuth", null);
      this.$router.push("/login");
    }
  }
};
</script>
