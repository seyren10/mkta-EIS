<script>
import Spinner from "../components/spinner.vue";
import NavLink from "./components/NavLink.vue";
import { links } from "./linksConfig";

export default {
    data: () => {
        return {
            drawer: null,
            links: links,
        };
    },
    components: { NavLink, Spinner },
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

            <v-app-bar-title>MKTA Employee Inventory System</v-app-bar-title>
        </v-app-bar>

        <v-main class="bg-grey-lighten-5">
            <v-container>
                <router-view v-slot="{ Component }">
                    <template v-if="Component">
                        <Suspense timeout="0">
                            <component :is="Component" />

                            <template v-slot:fallback>
                                <Spinner />
                            </template>
                        </Suspense>
                    </template>
                </router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped>
#actions {
    margin-right: 2rem;
}
</style>
