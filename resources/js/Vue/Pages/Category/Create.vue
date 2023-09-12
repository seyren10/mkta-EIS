<script>
export default {
    data() {
        return {
            dialog: false,
            form: {
                name: null,
                description: null,
                errors: {},
            },
        };
    },
    methods: {
        async create() {
            try {
                const res = await axios.post("/api/category", this.form);
                if (res.status === 201) {
                    this.dialog = false;
                    this.form = { name: null, description: null, errors: {} };
                    this.$emit("created");
                }
            } catch (error) {
                console.log(error.response.data.errors);
                this.form.errors = error.response.data.errors;
            }
        },
    },
};
</script>

<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            fullscreen
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
                >
                    Add Category
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="white" class="border-b">
                    <v-toolbar-title>Create Category</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                            variant="text"
                            color="blue-lighten-1"
                            @click="dialog = false"
                        >
                            Create
                        </v-btn>
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
                                    :error="form.errors === null"
                                    :error-messages="form.errors?.name"
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
