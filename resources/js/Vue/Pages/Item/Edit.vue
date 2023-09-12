<script>
export default {
    props: {
        categories: Array,
        item: Object,
    },
    data() {
        return {
            dialog: false,
            form: {
                brand: this.item.brand,
                model: this.item.model,
                serial_no: this.item.serial_no,
                mk_tag_no: this.item.mk_tag_no,
                category_id: this.item.category_id,
                errors: {},
            },
            isLoading: false,
        };
    },
    methods: {
        async update() {
            try {
                this.isLoading = true;
                const res = await axios.put(
                    `/api/item/${this.item.id}`,
                    this.form
                );
                this.dialog = false;
                this.form = {
                    brand: null,
                    model: null,
                    serial_no: null,
                    category_id: 1,
                    mk_tag_no: null,
                    errors: {},
                };
                this.$emit("updated");
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
            fullscreen
            :scrim="false"
            transition="dialog-bottom-transition"
        >
            <template v-slot:activator="{ props }">
                <v-btn
                    color="blue-lighten-1"
                    dark
                    v-bind="props"
                    icon="mdi-pencil"
                    size="small"
                >
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="white" class="border-b">
                    <v-toolbar-title>Update Item</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                            variant="text"
                            color="blue-lighten-1"
                            @click="dialog = false"
                        >
                            Update
                        </v-btn>
                        <v-btn variant="text" @click="dialog = false">
                            cancel
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-container style="max-width: 50rem">
                    <v-row>
                        <v-form style="width: 100%" @submit.prevent="update">
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
                                    >Update Item</v-btn
                                ></v-col
                            >
                        </v-form>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<style scoped>
.dialog-button {
    top: 0.7rem;
}
</style>
