<script>
import Create from "./Create.vue";
import Edit from "./Edit.vue";
import { useCategoryStore } from "../../stores/categoryStore";
import { useItemStore } from "../../stores/itemStore";
import { storeToRefs } from "pinia";

export default {
    async setup() {
        const categoryStore = useCategoryStore();
        const { categories } = storeToRefs(categoryStore);
        await categoryStore.getCategories();

        const itemStore = useItemStore();
        // await itemStore.getItems();

        const { getItemCountByCategory } = storeToRefs(itemStore);
        return {
            categories,
            categoryStore,
            itemStore,
            getItemCountByCategory,
        };
    },
    methods: {},
    data() {
        return {
            Editing: {
                dialog: false,
                data: null,
            },
        };
    },
    components: { Create, Edit },
};
</script>

<template>
    <div class="actions">
        <Create></Create>
    </div>
    <v-table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Device Count</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="category in categories" :key="category.id">
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>
                    <v-chip>{{ category.items_count }}</v-chip>
                </td>
                <td>
                    <v-btn
                        fab
                        @click="
                            () => {
                                Editing.data = category;
                                Editing.dialog = true;
                            }
                        "
                        icon="mdi-pencil"
                    />
                </td>
            </tr>
        </tbody>
    </v-table>
    <v-dialog v-model="Editing.dialog" full-screen>
        <Edit :category="Editing.data" v-on:close="Editing.dialog = false" />
    </v-dialog>
</template>

<style scoped></style>
