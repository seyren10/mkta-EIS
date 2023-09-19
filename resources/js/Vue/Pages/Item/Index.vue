<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import Create from "./Create.vue";
import Edit from "./Edit.vue";
import Associate from "./Associate.vue";
import { ref } from "vue";
import { useItemStore } from "../../stores/itemStore";
import { useEmployeeInventoryStore } from "../../stores/employeeInventoryStore";
import { storeToRefs } from "pinia";

export default {
    async setup() {
        const itemStore = useItemStore();
        const { items } = storeToRefs(itemStore);
        itemStore.getItems();

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
    components: { VDataTable, Create, Edit, Associate },
    data() {
        return {
            search: "",
            headers: [
                { key: "category", title: "Category" },
                { key: "brand", title: "Brand" },
                { key: "model", title: "Model" },
                { key: "condition", title: "Condition" },
                { key: "employee_name", title: "Active user" },
                { key: "device_association", title: "Device Association" },
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
                <div style="display: flex; gap: 2rem; align-items: center">
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
                        <v-btn
                            color="blue-lighten-4 text-grey-darken-2"
                            variant="flat"
                            size="small"
                            >view device</v-btn
                        >
                    </router-link>
                    <Edit
                        :categories="categories"
                        :item="item.selectable"
                        :key="Math.random()"
                    />
                </div>
            </template>

            <template #item.condition="{ item }">
                <v-chip
                    :color="
                        item.raw.condition === 'working'
                            ? 'green'
                            : item.raw.condition === 'damaged'
                            ? 'orange'
                            : 'red'
                    "
                    size="small"
                >
                    {{ item.raw.condition }}
                </v-chip>
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
            <template #item.device_association="{ item }">
                <div
                    class="d-flex"
                    style="gap: 1rem"
                    v-if="item.selectable.condition === 'working'"
                >
                    <Associate
                        v-if="!item.selectable.owned_by_employee"
                        :item="item.selectable"
                    >
                    </Associate>

                    <v-btn
                        v-else
                        prepend-icon="mdi-minus"
                        rounded="2"
                        elevation="1"
                        variant="outlined"
                        color="blue-lighten-1"
                        size="small"
                        @click="() => surrender(item.selectable)"
                        :loading="employeeInventoryStore.isLoading"
                        >Surrender</v-btn
                    >
                </div>
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
