<script>
import { useItemStore } from "../../stores/itemStore";
import { storeToRefs } from "pinia";
export default {
    setup() {
        const itemStore = useItemStore();
        const { errors, isLoading } = storeToRefs(itemStore);
        return { itemStore, isLoading, errors };
    },
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
                condition: this.item.condition,
            },
        };
    },
    methods: {
        async update() {
            await this.itemStore.updateItem(this.item.id, this.form);

            if (!Object.keys(this.errors).length) {
                this.dialog = false;
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
            style="max-width: 30rem"
            persistent
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
                        <v-btn variant="text" @click="dialog = false">
                            cancel
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-container>
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
                            <v-col cols="12">
                                <v-select
                                    label="Device Condition"
                                    :items="['working', 'damaged', 'broken']"
                                    v-model="form.condition"
                                    :error="errors.condition ? true : false"
                                    :error-messages="errors.condition"
                                >
                                </v-select>
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
