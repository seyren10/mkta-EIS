<script>
import { useEmployeeStore } from "../../stores/employeeStore";
import { useEmployeeInventoryStore } from "../../stores/employeeInventoryStore";
import { useItemStore } from "../../stores/itemStore";
import { storeToRefs } from "pinia";
import { VDatePicker } from "vuetify/labs/VDatePicker";
import { VDataTable } from "vuetify/lib/labs/VDataTable/index.mjs";
export default {
    setup() {
        const employeeStore = useEmployeeStore();
        const employeeInventoryStore = useEmployeeInventoryStore();
        const itemStore = useItemStore();

        const { errors, isLoading, employeeInventories } = storeToRefs(
            employeeInventoryStore
        );

        return {
            employeeStore,
            employeeInventoryStore,
            errors,
            isLoading,
            employeeInventories,
            itemStore,
        };
    },
    components: { VDatePicker, VDataTable },
    props: {
        item: Object,
    },
    data() {
        return {
            form: {
                transferred_date: new Date().toISOString().split("T")[0],
                officer_in_charge: "Manuelito Dayrit",
                is_active: 1,
                item_id: this.item.id,
                employee_id: null,
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
                this.itemStore.getItems();
                this.dialog = false;
            }
        },
    },
    async created() {
        await this.employeeStore.getEmployees();
        this.employees = this.employeeStore.activeEmployees;
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
                    prepend-icon="mdi-plus"
                    rounded="2"
                    elevation="1"
                    color="blue-lighten-1"
                    size="small"
                    v-bind="props"
                >
                    transfer
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="white" class="border-b">
                    <v-toolbar-title style="font-size: 1rem"
                        >Assign to Employee</v-toolbar-title
                    >
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
                            <v-col cols="12" class="date">
                                <label for="date">Date of transfer</label>
                                <input
                                    id="date"
                                    type="date"
                                    v-model="form.transferred_date"
                                />
                                <p v-if="form.errors?.transferred_date">
                                    {{ form.errors.transferred_date }}
                                </p>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Officer in charge*"
                                    required
                                    v-model="form.officer_in_charge"
                                    readOnly
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
        </v-dialog>
    </v-row>
</template>

<style scoped>
.date {
    display: grid;
}
.date > label {
    font-size: 0.8rem;
    color: rgb(110, 110, 110);
}
.date > input[type="date"] {
    background-color: rgb(247, 247, 247);
    padding: 0.8rem 0.3rem;
    border-radius: 0.3em;
}
</style>
