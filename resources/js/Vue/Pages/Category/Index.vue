<script>
import Create from "./Create.vue";
import Edit from "./Edit.vue";
import { ref } from "vue";
export default {
    async setup() {
        const res = await axios.get("api/category");
        const categories = ref(res.data);

        return {
            categories,
        };
    },
    data() {
        return {
            mounted: false,
        };
    },
    mounted() {
        this.mounted = true;
    },
    methods: {
        async fetchCategories() {
            const res = await axios.get("api/category");
            this.categories = res.data;
        },
    },
    components: { Create, Edit },
};
</script>

<template>
    <v-table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(category, index) in categories.data" :key="index">
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>
                    <Edit
                        :category="category"
                        @updated="fetchCategories"
                    ></Edit>
                </td>
            </tr>
        </tbody>
    </v-table>

    <Teleport to="#actions" v-if="mounted">
        <div class="actions">
            <Create @created="fetchCategories"></Create>
        </div>
    </Teleport>
</template>

<style scoped>
.actions {
    margin-inline-end: 1rem;
}
</style>
