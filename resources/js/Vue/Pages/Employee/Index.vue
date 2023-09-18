<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import Create from "./Create.vue";
import Edit from "./Edit.vue";
import { useEmployeeStore } from "../../stores/employeeStore";
import { storeToRefs } from "pinia";

export default {
    async setup() {
        const employeeStore = useEmployeeStore();
        const { employees } = storeToRefs(employeeStore);

        await employeeStore.getEmployees();

        return { employees, employeeStore };
    },
    components: { VDataTable, Create, Edit },
    data() {
        return {
            search: "",

            headers: [
                { key: "employee_no", title: "Employee Number" },
                { key: "full_name", title: "Full Name" },
                { key: "is_active", title: "Status" },
                { key: "actions" },
            ],
        };
    },
};
</script>

<template>
    <div>
        <Create @created="employeeStore.getEmployees()"></Create>
    </div>
    <v-card>
        <v-card-title>
            Employees
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>
        <VDataTable :headers="headers" :items="employees" :search="search">
            <template #item.actions="{ item }">
                <div style="display: flex; gap: 2rem; align-items: center">
                    <router-link
                        :to="{
                            name: 'show',
                            params: {
                                showable: 'employee',
                                id: item.selectable.id,
                            },
                        }"
                    >
                        <v-btn
                            color="blue-lighten-4 text-grey-darken-2"
                            variant="flat"
                            size="small"
                            >view details</v-btn
                        >
                    </router-link>
                    <Edit :employee="item.selectable"></Edit>
                </div>
            </template>

            <template #item.is_active="{ item }">
                <v-chip
                    :color="item.raw.is_active ? 'green' : 'red'"
                    size="small"
                >
                    {{ item.raw.is_active ? "active" : "inactive" }}
                </v-chip>
            </template>
        </VDataTable>
    </v-card>
</template>

<style scoped>
.v-row {
    flex-wrap: nowrap;
    margin: 0 !important;
    flex: none;
}
</style>
