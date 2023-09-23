<script>
import { useEmployeeStore } from "../../stores/employeeStore";
import { useEmployeeInventoryStore } from "../../stores/employeeInventoryStore";
import { useItemStore } from "../../stores/itemStore";
import { useLocationStore } from "../../stores/locationStore";
import { storeToRefs } from "pinia";

import { VDataTable } from "vuetify/lib/labs/VDataTable/index.mjs";
export default {
    async setup() {
        const employeeStore = useEmployeeStore();
        const employeeInventoryStore = useEmployeeInventoryStore();
        const itemStore = useItemStore();
        const locationStore = useLocationStore();

        await locationStore.getLocations();
        await employeeStore.getEmployees();
        const { errors, isLoading, employeeInventories } = storeToRefs(
            employeeInventoryStore
        );
        const { locations } = storeToRefs(locationStore);

        return {
            employeeStore,
            employeeInventoryStore,
            errors,
            isLoading,
            employeeInventories,
            itemStore,
            locations,
        };
    },
    components: { VDataTable },
    props: {
        item: Object,
        user: Object,
    },
    emits: ["close", "change"],
    data() {
        return {
            form: {
                transferred_date: new Date().toISOString().split("T")[0],
                officer_in_charge: this.user ? this.user.name : "anonymous",
                is_active: 1,
                item_id: this.item.id,
                employee_id: null,
                location_id: null,
            },
            dialog: false,
            search: "",
            employees: [],
        };
    },
    methods: {
        async create() {
            await this.employeeInventoryStore.postEmployeeInventories(
                this.form
            );

            if (!Object.keys(this.errors).length) {
                // this.itemStore.getItems();
                this.$emit("change");
            }
        },
    },
    async created() {
        // await this.employeeStore.getEmployees();
        this.employees = this.employeeStore.activeEmployees;
    },
};
</script>

<template>
    <v-card>
        <v-toolbar color="white" class="border-b">
            <v-toolbar-title style="font-size: 1rem"
                >Assign to Employee</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn variant="text" @click="$emit('close')"> cancel </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-container style="max-width: 50rem">
            <v-row>
                <v-form style="width: 100%" @submit.prevent="create">
                    <v-col cols="12" class="date">
                        <label for="date">Date of transfer*</label>
                        <input
                            id="date"
                            type="date"
                            v-model="form.transferred_date"
                        />
                        <p v-if="form.errors?.date_purchased">
                            {{ form.errors.date_purchased }}
                        </p>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            label="Officer in charge*"
                            required
                            v-model="form.officer_in_charge"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            label="Device to transfer*"
                            readOnly
                            :model-value="`${item.brand} ${item.model}`"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-autocomplete
                            label="Assign to employee"
                            :items="
                                employees.map((emp) => {
                                    return {
                                        title: emp.full_name,
                                        value: emp.id,
                                    };
                                })
                            "
                            v-model="form.employee_id"
                            :error="errors?.employee_id ? true : false"
                            :error-messages="errors.employee_id"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                        <v-autocomplete
                            label="Assign Location"
                            :items="
                                locations.map((loc) => {
                                    return {
                                        title: loc.name,
                                        value: loc.id,
                                    };
                                })
                            "
                            v-model="form.location_id"
                            :error="errors?.location_id ? true : false"
                            :error-messages="errors.location_id"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12"
                        ><v-btn
                            block
                            variant="flat"
                            color="blue-lighten-1"
                            type="submit"
                            :loading="isLoading"
                            >assign device</v-btn
                        ></v-col
                    >
                </v-form>
            </v-row>
        </v-container>
    </v-card>
</template>
