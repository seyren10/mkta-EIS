<script>
export default {
    data() {
        return {
            employee: {},
        };
    },
    methods: {
        async fetchEmployee() {
            const res = await axios.get(
                `/api/employee/${this.$route.params.id}`
            );
            this.employee = res.data.data;
        },
    },
    created() {
        this.fetchEmployee();
    },
};
</script>
<template>
    <v-row>
        <v-col>
            <v-img
                class="bg-white"
                width="300"
                :aspect-ratio="1"
                src="/Logo.svg"
                contain
                style="margin-inline: auto"
            ></v-img>
        </v-col>
        <v-col>
            <v-card
                :title="employee?.full_name"
                :subtitle="`ID Number: ${employee?.employee_no}`"
            >
                <v-card-text>
                    <div
                        class="d-flex align-center text-blue-grey-darken-3 mt-5"
                        style="gap: 1rem"
                    >
                        <v-icon>mdi-devices</v-icon>
                        <h2 class="text-h6">Device/s Owned</h2>
                    </div>
                    <v-table v-if="employee.items?.length">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Brand</th>
                                <th>model</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in employee.items"
                                :key="index"
                            >
                                <td>{{ item.category.name }}</td>
                                <td><router-link :to="`/item/${item.id}/show`" class="text-blue-lighten-1">{{ item.brand }}</router-link> </td>
                                <td>{{ item.model }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
                <!-- <v-card-actions>
                    <v-btn>Click me</v-btn>
                </v-card-actions> -->
            </v-card>
        </v-col>
    </v-row>
</template>
