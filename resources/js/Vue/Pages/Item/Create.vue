<script>
import { useItemStore } from "../../stores/itemStore";
import { storeToRefs } from "pinia";
export default {
    setup() {
        const itemStore = useItemStore();
        const { errors, isLoading } = storeToRefs(itemStore);

        return { errors, isLoading, itemStore };
    },
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
            },
        };
    },

    methods: {
        async create() {
            await this.itemStore.postItem(this.form);

            if (!Object.keys(this.errors).length) {
                this.form = {
                    brand: null,
                    model: null,
                    serial_no: null,
                    mk_tag_no: null,
                    category_id: this.categories.length
                        ? 1
                        : "No Category Available",
                    condition: "working",
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
                                    :error="errors.brand ? true : false"
                                    :error-messages="errors.brand"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Device Model*"
                                    required
                                    v-model="form.model"
                                    :error="errors.model ? true : false"
                                    :error-messages="errors.model"
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
