<script>
import { useCategoryStore } from "../../stores/categoryStore";
import { storeToRefs } from "pinia";
export default {
    setup() {
        const categoryStore = useCategoryStore();
        const { errors, isLoading } = storeToRefs(categoryStore);
        return { categoryStore, errors, isLoading };
    },
    data() {
        return {
            dialog: false,
            form: {
                name: null,
                description: null,
            },
        };
    },
    methods: {
        async create() {
            this.categoryStore.addCategory(this.form);

            if (!Object.keys(this.errors).length) {
                this.form = {
                    name: null,
                    description: null,
                };
                this.dialog = false;
            }
        },
    },
};
</script>

<template>
    <v-row justify="start" class="py-2">
        <v-dialog
            v-model="dialog"
            persistent
            style="max-width: 30rem"
            :scrim="false"
            transition="dialog-bottom-transition"
        >
            <template v-slot:activator="{ props }">
                <v-btn
                    color="blue-lighten-1"
                    dark
                    v-bind="props"
                    prepend-icon="mdi-plus"
                    class="mr-10"
                    size="small"
                >
                    Add Category
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="white" class="border-b">
                    <v-toolbar-title>Create Category</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn variant="text" @click="dialog = false">
                            cancel
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-container style="max-width: 50rem">
                    <v-row>
                        <v-form style="width: 100%" @submit.prevent="create">
                            <v-col cols="12">
                                <v-text-field
                                    label="Name*"
                                    v-model="form.name"
                                    :errors="errors?.name ? true : false"
                                    :error-messages="errors?.name"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Description"
                                    v-model="form.description"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12"
                                ><v-btn
                                    block
                                    variant="flat"
                                    color="blue-lighten-1"
                                    type="submit"
                                    :loading="isLoading"
                                    >Create Category</v-btn
                                ></v-col
                            >
                        </v-form>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </v-row>
</template>
