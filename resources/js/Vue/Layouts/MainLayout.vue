<script>
import Spinner from "../components/spinner.vue";
import NavLink from "./components/NavLink.vue";
import { links } from "./linksConfig";
import { useUserStore } from "../stores/userStore";
import { storeToRefs } from "pinia";
export default {
    setup() {
        const userStore = useUserStore();
        const { user } = storeToRefs(userStore);

        return {
            userStore,
            user,
        };
    },
    data: () => {
        return {
            drawer: null,
            links: links,
        };
    },
    created() {
        // this.userStore.getUser();
    },
    components: { NavLink, Spinner },
    methods: {
        async handleLogout() {
            await this.userStore.logout();
        },
    },
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
            <template #append>
                <div v-if="user">
                    <v-btn
                        prepend-icon="mdi-account-circle"
                        variant="plain"
                        class="text-none"
                        >Hi, {{ user?.name }}</v-btn
                    >
                    <v-btn
                        variant="outlined"
                        class="text-none"
                        prepend-icon="mdi-logout"
                        color="blue-lighten-1"
                        size="small"
                        @click="handleLogout"
                        >Logout</v-btn
                    >
                </div>
                <div v-else>
                    <router-link
                        :to="{ name: 'login' }"
                        class="text-blue-lighten-1"
                        ><v-btn
                            class="text-none"
                            variant="tonal"
                            prepend-icon="mdi-login-variant"
                            >Sign in</v-btn
                        ></router-link
                    >
                </div>
            </template>
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
