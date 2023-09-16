<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import Create from "./Create.vue";
import Edit from "./Edit.vue";
import { ref } from "vue";
export default {
    async setup() {
        const res = await axios.get("/api/employee");
        const employees = ref(res.data.data);

        return { employees };
    },
    components: { VDataTable, Create, Edit },
    data() {
        return {
            search: "",
            mounted: false,

            headers: [
                { key: "employee_no", title: "Employee Number" },
                { key: "full_name", title: "Full Name" },
                { key: "is_active", title: "Status" },
                { key: "actions" },
            ],
        };
    },
    methods: {
        async fetchEmployees() {
            const res = await axios.get("/api/employee");
            this.employees = res.data.data;
        },
    },

    mounted() {
        this.mounted = true;
    },
};
</script>

<template>
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
    <Teleport to="#actions" v-if="mounted">
        <div class="actions">
            <Create @created="fetchEmployees"></Create>
        </div>
    </Teleport>
</template>

<style scoped>
.v-row {
    flex-wrap: nowrap;
    margin: 0 !important;
    flex: none;
}
</style>
