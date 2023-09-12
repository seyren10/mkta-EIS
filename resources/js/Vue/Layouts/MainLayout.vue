<script>
import NavLink from "./components/NavLink.vue";
import { links } from "./linksConfig";

export default {
    data: () => ({ drawer: null, links: links }),
    components: { NavLink },
};
</script>
<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer">
            <v-card>
                <v-layout>
                    <v-main style="height: 100vh">
                        <img src="/Logo.svg" alt="" />
                        <v-list density="compact" nav class="mt-4">
                            <NavLink :links="links" />
                        </v-list>
                    </v-main>
                </v-layout>
            </v-card>
        </v-navigation-drawer>

        <v-app-bar density="compact" :elevation="0" class="border-b">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-app-bar-title>MK Themed Attractions phils. inc.</v-app-bar-title>
            <div id="actions"></div>
        </v-app-bar>

        <v-main class="bg-grey-lighten-5">
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script></script>

<style scoped>
#actions {
    margin-right: 2rem;
}
</style>
