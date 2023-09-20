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
                date_purchased: new Date().toISOString().split("T")[0],
                accountability_no: null,
                category_id: this.categories.length
                    ? 1
                    : "No Category Available",
                status: "good",
            },
            additionalData: {
                processor: null,
                motherboard: null,
                memory: null,
                storage: null,
                peripherals: null,
            },
        };
    },

    methods: {
        async create() {
            //pass additional data when a category is a PC SET
            if (this.form.category_id === 1) {
                this.form = {
                    ...this.form,
                    json_attr: JSON.stringify({ ...this.additionalData }),
                };
            }

            await this.itemStore.postItem(this.form);

            if (!Object.keys(this.errors).length) {
                this.dialog = false;
                this.form = {
                    brand: null,
                    model: null,
                    serial_no: null,
                    mk_tag_no: null,
                    date_purchased: new Date().toISOString().split("T")[0],
                    accountability_no: null,
                    category_id: this.categories.length
                        ? 1
                        : "No Category Available",
                    condition: "good",
                };
                this.additionalData = {
                    processor: null,
                    motherboard: null,
                    memory: null,
                    storage: null,
                    peripherals: null,
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
            style="max-width: 50rem"
        >
            <template v-slot:activator="{ props }">
                <v-btn
                    color="blue-lighten-1"
                    v-bind="props"
                    prepend-icon="mdi-plus"
                    size="small"
                >
                    Add Device
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="white" class="border-b">
                    <v-toolbar-title>Add Device</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn variant="text" @click="dialog = false">
                            cancel
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-container>
                    <v-form @submit.prevent="create">
                        <v-row>
                            <v-col>
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
                                <v-col cols="12" class="date">
                                    <label for="date">Purchased Date*</label>
                                    <input
                                        id="date"
                                        type="date"
                                        v-model="form.date_purchased"
                                    />
                                    <p v-if="form.errors?.date_purchased">
                                        {{ form.errors.date_purchased }}
                                    </p>
                                </v-col>
                            </v-col>
                            <v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Accountability Number*"
                                        v-model="form.accountability_no"
                                        :error="
                                            errors.accountability_no
                                                ? true
                                                : false
                                        "
                                        :error-messages="
                                            errors.accountability_no
                                        "
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
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" v-if="form.category_id === 1">
                                <h3 class="text-overline">Additional Data</h3>
                                <v-text-field
                                    label="Processor"
                                    placeholder="processor brand,speed,serial number"
                                    v-model="additionalData.processor"
                                ></v-text-field>
                                <v-text-field
                                    label="Motherboard"
                                    placeholder="motherboard brand,type,serial number etc..."
                                    v-model="additionalData.motherboard"
                                ></v-text-field>
                                <v-text-field
                                    label="RAM (Memory)"
                                    placeholder="RAM brand,memory size,speed, serial number"
                                    v-model="additionalData.memory"
                                ></v-text-field>
                                <v-text-field
                                    label="HDD/SSD (Storage)"
                                    placeholder="HDD/SSD brand, storage size, serial number, etc..."
                                    v-model="additionalData.storage"
                                ></v-text-field>
                                <v-text-field
                                    label="Peripherals"
                                    placeholder="include mouse,keyboard,speakers, etc... "
                                    v-model="additionalData.peripherals"
                                ></v-text-field>
                            </v-col>
                        </v-row>
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
                </v-container>
            </v-card>
        </v-dialog>
    </v-row>
</template>
