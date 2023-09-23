<script>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/userStore";
export default {
    setup() {
        const userStore = useUserStore();
        const { error, loading } = storeToRefs(userStore);

        return { userStore, error, loading };
    },
    data() {
        return {
            email: null,
            password: null,
            showPass: false,
        };
    },
    methods: {
        async login() {
            await this.userStore.login(this.email, this.password);
        },
    },
};
</script>

<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-row>
            <v-col align="center">
                <v-sheet width="400">
                    <v-img src="/Logo.svg" alt="MK THEMED ATTRACTIONS LOGO" />
                    <v-alert
                        density="compact"
                        v-if="error"
                        class="mb-4 text-caption bg-red-lighten-3 text-red-darken-4"
                        >{{ error }}</v-alert
                    >
                    <v-form @submit.prevent="login">
                        <v-text-field
                            v-model="email"
                            label="Email"
                            type="email"
                        ></v-text-field>

                        <v-text-field
                            v-model="password"
                            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                            label="password"
                            :type="showPass ? 'text' : 'password'"
                            @click:append="showPass = !showPass"
                        ></v-text-field>

                        <v-btn
                            type="submit"
                            color="blue-lighten-1"
                            block
                            class="mt-2"
                            :loading="loading"
                            >Sign in</v-btn
                        >
                    </v-form>
                </v-sheet>
            </v-col>
            <v-col align="center">
                <v-img :width="450" src="/task-2.png" aspect-ratio="1"></v-img>
            </v-col>
        </v-row>
    </div>
</template>
