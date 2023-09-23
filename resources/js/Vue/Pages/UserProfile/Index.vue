<template>
    <div class="center">
        <v-sheet :height="500" :width="500" border rounded>
            <v-card elevation="0">
                <v-card-title class="d-flex align-center"
                    ><component
                        class="mr-3"
                        :is="editName ? 'EditNameInput' : 'span'"
                        v-bind="props"
                        @update="(val) => updateEditableName(val)"
                    >
                        {{ !editName ? user?.name : "" }}
                    </component>
                    <v-icon
                        size="xs"
                        color="blue-lighten-1"
                        @click="editName = !editName"
                        >mdi-pencil-outline</v-icon
                    ></v-card-title
                >
                <v-card-subtitle class="border-b">Superuser</v-card-subtitle>
                <v-card-text>
                    <div>
                        <v-icon class="text-grey mr-3"
                            >mdi-email-outline</v-icon
                        >
                        <span class="text-body-1">{{ user?.email }}</span>
                        <p class="text-caption text-grey">Email</p>
                    </div>
                    <div class="mt-10" v-if="!user?.password_changed">
                        <v-icon class="text-grey mr-3">mdi-key-outline</v-icon>
                        <span class="text-body-1">Set your new password</span>
                        <p class="text-caption text-grey">
                            You can change your password one time after
                            registration
                        </p>
                        <v-form @submit.prevent="handleSubmit">
                            <v-text-field
                                label="Password"
                                type="password"
                                v-model="form.password"
                            ></v-text-field>
                            <v-text-field
                                label="Confirm Password"
                                type="password"
                                v-model="form.password_confirmation"
                            ></v-text-field>
                            <v-btn
                                class="text-none"
                                variant="flat"
                                color="blue-lighten-1"
                                type="submit"
                                >Set new password</v-btn
                            >
                        </v-form>
                    </div>
                    <div else class="mt-3">
                        <v-icon class="text-grey mr-3">mdi-lock-outline</v-icon>
                        <span class="text-body-1"
                            >You already set your new password</span
                        >
                        <p class="text-caption text-grey">
                            contact the system admin to help you reset your
                            account
                        </p>
                    </div>
                    <div else class="mt-3">
                        <v-icon class="text-grey mr-3">mdi-devices</v-icon>
                        <span class="text-body-1">6 device/s</span>
                        <p class="text-caption text-grey">
                            Total of devices you process
                        </p>
                    </div>
                </v-card-text>
            </v-card>
        </v-sheet>
    </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/userStore";
import EditNameInput from "./EditNameInput.vue";
export default {
    async setup() {
        const userStore = useUserStore();
        const { user } = storeToRefs(userStore);

        return {
            user,
            userStore,
        };
    },
    components: {
        EditNameInput,
    },
    data() {
        return {
            form: {
                password: null,
                password_confirmation: null,
            },
            editName: false,
            props: {
                userName: this.user.name,
            },
            editableNameValue: this.user.name,
        };
    },
    methods: {
        handleSubmit() {
            this.userStore.setPasswordFirstTime(this.form);
        },
        handleSubmitName() {
            this.userStore.updateName({ name: this.editableNameValue });
        },
        updateEditableName(val) {
            this.editableNameValue = val;
        },
    },
    watch: {
        editName(newVal, oldVal) {
            if (oldVal) {
                this.handleSubmitName();
            }
        },
    },
};
</script>

<style scoped>
.center {
    display: grid;
    min-height: 80vh;
    place-content: center;
}
</style>
