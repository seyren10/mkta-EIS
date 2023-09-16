<script>
export default {
    props: {
        categories: Array,
    },
    data() {
        return {
            dialog: false,
            form: {
                brand: null,
                model: null,
                serial_no: null,
                mk_tag_no: null,
                category_id: this.categories.length
                    ? 1
                    : "No Category Available",
                condition: "working",
                errors: {},
            },
            isLoading: false,
        };
    },
    watch: {
        dialog(newC, oldC) {
            console.log(this.categories);
        },
    },
    methods: {
        async create() {
            try {
                this.isLoading = true;
                const res = await axios.post("/api/item", this.form);
                this.dialog = false;
                this.form = {
                    brand: null,
                    model: null,
                    serial_no: null,
                    category_id: null,
                    mk_tag_no: null,
                    errors: {},
                };
                this.$emit("created");
            } catch (error) {
                console.log(error.response);
                this.form.errors = error.response.data.errors;
            } finally {
                this.isLoading = false;
            }
        },
    },
};
</script>

<template>
    <v-row justify="center">
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
                >
                    Add Item
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="white" class="border-b">
                    <v-toolbar-title>Add Item</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn variant="text" @click="dialog = false">
                            cancel
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-container style="max-width: 30rem">
                    <v-row>
                        <v-form style="width: 100%" @submit.prevent="create">
                            <v-col cols="12">
                                <v-select
                                    label="Category*"
                                    required
                                    :items="
                                        categories.map((c) => {
                                            return {
                                                title: c.name,
                                                value: c.id,
                                            };
                                        })
                                    "
                                    v-model="form.category_id"
                                ></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Brand*"
                                    required
                                    v-model="form.brand"
                                    :error="form.errors.brand ? true : false"
                                    :error-messages="form.errors.brand"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Device Model*"
                                    required
                                    v-model="form.model"
                                    :error="form.errors.model ? true : false"
                                    :error-messages="form.errors.model"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Serial Number"
                                    hint="usally found at the back of your device"
                                    v-model="form.serial_no"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="MK Tag Number"
                                    v-model="form.mk_tag_no"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12"
                                ><v-btn
                                    block
                                    variant="flat"
                                    color="blue-lighten-1"
                                    type="submit"
                                    :loading="isLoading"
                                    >Create Item</v-btn
                                ></v-col
                            >
                        </v-form>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </v-row>
</template>
