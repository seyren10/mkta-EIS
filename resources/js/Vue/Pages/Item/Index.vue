<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import Create from "./Create.vue";
import Edit from "./Edit.vue";
import Associate from "./Associate.vue";
import { ref } from "vue";
import { useItemStore } from "../../stores/itemStore";
import { useEmployeeInventoryStore } from "../../stores/employeeInventoryStore";
import { storeToRefs } from "pinia";
import Chip from "../../components/Chip.vue";

export default {
    async setup() {
        const itemStore = useItemStore();
        const { items } = storeToRefs(itemStore);
        await itemStore.getItems();

        const categoryRes = await axios.get("/api/category");
        const categories = ref(categoryRes.data.data);

        const employeeInventoryStore = useEmployeeInventoryStore();

        return {
            items,
            categories,
            employeeInventoryStore,
            itemStore,
        };
    },
    components: { VDataTable, Create, Edit, Associate, Chip },
    data() {
        return {
            search: "",
            headers: [
                { key: "brand", title: "Brand" },
                { key: "model", title: "Model" },
                { key: "status", title: "Status" },
                { key: "accountability_no", title: "Accountability No." },
                { key: "employee_name", title: "Active user" },
                { key: "location_from", title: "From" },
                { key: "location_name", title: "To" },
                { key: "actions", title: "", sortable: false },
            ],
        };
    },
    computed: {
        itemDataTable() {
            return this.items.map((item) => {
                return {
                    ...item,
                    category: item.category.name,
                    category_id: item.category.id,
                    employee_name: item.owned_by_employee?.full_name,
                    employee_id: item.owned_by_employee?.id,
                    location_id: item.employee_inventories.by_location?.id,
                    location_name: item.employee_inventories.length
                        ? item.employee_inventories.at(0).by_location.name
                        : "MIS Office",
                    location_from:
                        item.employee_inventories.length >= 2
                            ? item.employee_inventories.at(1).by_location.name
                            : "MIS Office",
                };
            });
        },
    },
    methods: {
        async fetchCategories() {
            try {
                const res = await axios.get("/api/category");
                this.categories = res.data.data;
            } catch (e) {}
        },

        async surrender(itemData) {
            this.employeeInventoryStore.postEmployeeInventories({
                transferred_date: new Date().toISOString().split("T")[0],
                officer_in_charge: "Manuelito Dayrit",
                is_active: 0,
                item_id: itemData.id,
                employee_id: itemData.employee_id,
                location_id: 1,
            });

            this.itemStore.getItems();
        },
    },
};
</script>

<template>
    <div>
        <Create :categories="categories"></Create>
    </div>
    <v-card>
        <v-card-title>
            Items
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>
        <VDataTable
            :headers="headers"
            :items="itemDataTable"
            :search="search"
            style="overflow-y: hidden"
        >
            <template #item.actions="{ item }">
                <div style="display: flex; gap: 1rem; align-items: center">
                    <router-link
                        v-if="item.selectable.id"
                        :to="{
                            name: 'show',
                            params: {
                                showable: 'item',
                                id: item.selectable.id,
                            },
                        }"
                    >
                        <v-tooltip text="View Information" location="left">
                            <template #activator="{ props }">
                                <v-btn
                                    v-bind="props"
                                    icon="mdi-information-outline"
                                    variant="flat"
                                ></v-btn>
                            </template>
                        </v-tooltip>
                    </router-link>
                    <v-tooltip
                        text="Transfer Device"
                        v-if="!item.selectable.owned_by_employee"
                    >
                        <template #activator="{ props }">
                            <Associate :item="item.selectable" v-bind="props">
                            </Associate>
                        </template>
                    </v-tooltip>

                    <v-btn
                        v-else
                        icon="mdi-cancel"
                        variant="flat"
                        class="text-red-lighten-1"
                        @click="() => surrender(item.selectable)"
                        :loading="employeeInventoryStore.isLoading"
                    ></v-btn>

                    <Edit
                        :categories="categories"
                        :item="item.selectable"
                        :key="Math.random()"
                    />
                </div>
            </template>

            <template #item.status="{ item }">
                <Chip :list="item.selectable.status" listType="condition" />
            </template>
            <template #item.employee_name="{ item }">
                <td>
                    <router-link
                        v-if="item.selectable.employee_id"
                        :to="{
                            name: 'show',
                            params: {
                                showable: 'employee',
                                id: item.selectable.employee_id,
                            },
                        }"
                        class="text-blue-lighten-1"
                        >{{ item.columns.employee_name }}</router-link
                    >
                </td>
            </template>
            <template #item.action="{ item }">
                <div class="d-flex" style="gap: 1rem"></div>
            </template>
        </VDataTable>
    </v-card>
</template>

<style scoped>
.actions {
    margin-inline-end: 2rem;
    display: flex;
    gap: 0.7rem;
}

.v-row {
    flex-wrap: nowrap;
    margin: 0 !important;
    flex: none;
}
</style>
