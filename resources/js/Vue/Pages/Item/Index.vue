<script>
import { ref } from "vue";
import { useItemStore } from "../../stores/itemStore";
import { useEmployeeInventoryStore } from "../../stores/employeeInventoryStore";
import { useUserStore } from "../../stores/userStore";
import { storeToRefs } from "pinia";

import Chip from "../../components/Chip.vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import Create from "./Create.vue";
import Edit from "./Edit.vue";
import Associate from "./Associate.vue";

export default {
    async setup() {
        const itemStore = useItemStore();
        const userStore = useUserStore();
        await itemStore.getItems();
        await userStore.getUser();

        const { items } = storeToRefs(itemStore);
        const { user } = storeToRefs(userStore);

        const categoryRes = await axios.get("/api/category");
        const categories = ref(categoryRes.data.data);

        const employeeInventoryStore = useEmployeeInventoryStore();

        return {
            user,
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
            Associate: {
                dialog: false,
                data: [],
            },
            Edit: {
                dialog: false,
                data: [],
            },
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
                    location_id:
                        item.employee_inventories.at(0).by_location?.id,
                    location_name: item.employee_inventories.length
                        ? item.employee_inventories.at(0).by_location.name
                        : null,
                    location_from:
                        item.employee_inventories.length >= 2
                            ? item.employee_inventories.at(1).by_location.name
                            : null,
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
                <v-btn
                    v-if="
                        item.selectable.location_id === 1 ||
                        !item.selectable.owned_by_employee
                    "
                    @click="
                        () => {
                            Associate.data = item;
                            Associate.dialog = true;
                        }
                    "
                    variant="flat"
                    class="text-blue-lighten-1"
                    icon="mdi-swap-horizontal"
                />

                <v-btn
                    v-else
                    icon="mdi-cancel"
                    variant="flat"
                    class="text-red-lighten-1"
                    @click="() => surrender(item.selectable)"
                    :loading="employeeInventoryStore.isLoading"
                ></v-btn>

                <v-btn
                    v-if="item.selectable.id"
                    :to="{
                        name: 'show',
                        params: {
                            showable: 'item',
                            id: item.selectable.id,
                        },
                    }"
                    icon="mdi-information-outline"
                    variant="flat"
                ></v-btn>
                <v-btn
                    icon="mdi-pencil-outline"
                    variant="flat"
                    @click="
                        () => {
                            Edit.dialog = true;
                            Edit.data = item.selectable;
                        }
                    "
                ></v-btn>
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
        </VDataTable>
    </v-card>
    <v-dialog v-model="Associate.dialog">
        <Associate
            v-on:close="Associate.dialog = false"
            v-on:change="
                () => {
                    Associate.dialog = false;
                    itemStore.getItems();
                }
            "
            :item="Associate.data.selectable"
            :user="user"
        />
    </v-dialog>
    <v-dialog v-model="Edit.dialog">
        <Edit
            v-on:close="Edit.dialog = false"
            v-on:change="
                () => {
                    Edit.dialog = false;
                    itemStore.getItems();
                }
            "
            :categories="categories"
            :item="Edit.data"
        />
    </v-dialog>
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
