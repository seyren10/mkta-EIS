<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import Create from "./Create.vue";
import Edit from "./Edit.vue";

export default {
    components: { VDataTable, Create, Edit },
    data() {
        return {
            mounted: false,
            search: "",
            items: [],
            categories: [],
            headers: [
                { key: "category", title: "Category" },
                { key: "brand", title: "Brand" },
                { key: "model", title: "Model" },
                // { key: "serial_no", title: "Serial Number" },
                // { key: "mk_tag_no", title: "MK Tag Number" },
                { key: "condition", title: "Condition" },
                { key: "owned_by_employee", title: "Employee in charge" },
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
                    owned_by_employee: item.owned_by_employee.full_name,
                };
            });
        },
    },
    methods: {
        fetchItem() {
            axios
                .get("/api/item")
                .then((res) => {
                    this.items = res.data.data;
                })
                .catch((err) => {});
        },
        async fetchCategories() {
            try {
                const res = await axios.get("/api/category");
                this.categories = res.data.data;
            } catch (e) {}
        },
        display(item) {
            console.log(item);
        },
    },
    created() {
        this.fetchCategories();
        this.fetchItem();
    },
    mounted() {
        this.mounted = true;
    },
};
</script>

<template>
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
                <!-- <v-btn @click="display(item)">Click</v-btn> -->
                <Edit
                    :categories="categories"
                    :item="item.selectable"
                    @updated="fetchItem"
                />
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
        </VDataTable>
    </v-card>

    <Teleport to="#actions" v-if="mounted">
        <div class="actions">
            <Create :categories="categories" @created="fetchItem"></Create>
        </div>
    </Teleport>
</template>

<style scoped>
.actions {
    margin-inline-end: 2rem;
    display: flex;
    gap: 0.7rem;
}
</style>
