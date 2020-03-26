<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app color="primary" absolute dark>
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

    <v-app-bar fixed app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,

      items: [
        {
          icon: "mdi-login",
          title: "Вход",
          to: "/login"
        },
        {
          icon: "mdi-calendar-check",
          title: "Главная",
          to: "/"
        }
      ],

      title: "Organizer"
    };
  }
};
</script>
