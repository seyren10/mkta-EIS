<script>
import { useLocationStore } from "../../stores/locationStore";
import { storeToRefs } from "pinia";
export default {
    setup() {
        const locationStore = useLocationStore();
        const { errors, isLoading, locations } = storeToRefs(locationStore);

        return { locationStore, errors, isLoading, locations };
    },
    props: {},
    data() {
        return {
            dialog: false,
            form: {
                name: null,
            },
        };
    },

    methods: {
        async create() {
            await this.locationStore.addLocation(this.form);

            if (!Object.keys(this.errors).length) {
                this.dialog = false;

                this.form = {
                    name: null,
                };
            }
        },
    },
};
</script>

<template>
    <v-row justify="start" class="py-2">
        <v-dialog
            v-model="dialog"
            :scrim="false"
            transition="dialog-bottom-transition"
            persistent
            style="max-width: 30rem"
        >
            <template v-slot:activator="{ props }">
                <v-btn
                    color="blue-lighten-1"
                    dark
                    v-bind="props"
                    prepend-icon="mdi-plus"
                    size="small"
                >
                    Add Location
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="white" class="border-b">
                    <v-toolbar-title>Add Location</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn variant="text" @click="dialog = false">
                            cancel
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-container style="max-width: 30rem">
                    <v-form @submit.prevent="create">
                        <v-row>
                            <v-col col="12">
                                <v-text-field
                                    label="Location name"
                                    v-model="form.name"
                                    :errors="errors?.name ? true : false"
                                    :error-messages="errors?.name"
                                    class="mb-3"
                                />

                                <v-btn
                                    type="submit"
                                    variant="flat"
                                    color="blue-lighten-1"
                                    class="w-100"
                                    :loading="isLoading"
                                    >Add</v-btn
                                >
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>
    </v-row>
</template>
