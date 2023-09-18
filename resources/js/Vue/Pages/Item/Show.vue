<script>
export default {
    data() {
        return {
            item: {},
            employeeInventory: [],
        };
    },

    methods: {
        async fetchItem() {
            const res = await axios.get(`/api/item/${this.$route.params.id}`);
            this.item = res.data.data;
        },

        async fetchEmployeeInventory() {
            const res = await axios.get(
                `/api/employee-inventory/${this.$route.params.id}`
            );
            this.employeeInventory = res.data.data;
        },
        transferType(isActive) {
            if (isActive) {
                return "Transfer";
            } else return "Surrender";
        },
    },
    created() {
        this.fetchItem();
        this.fetchEmployeeInventory();
    },
};
</script>

<template>
    <v-container>
        <v-card :title="item.model" :subtitle="item.category?.name">
            <v-card-text>
                <v-row>
                    <v-col>
                        <div
                            class="d-flex align-center text-blue-grey-darken-3 mt-5"
                            style="gap: 1rem"
                        >
                            <v-icon>mdi-devices</v-icon>
                            <h2 class="text-h6">Basic Information</h2>
                        </div>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title>{{
                                    item.category?.name
                                }}</v-list-item-title>
                                <v-list-item-subtitle
                                    >Device Type</v-list-item-subtitle
                                >
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>{{
                                    item.model
                                }}</v-list-item-title>
                                <v-list-item-subtitle
                                    >Model</v-list-item-subtitle
                                >
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>{{
                                    item.brand
                                }}</v-list-item-title>
                                <v-list-item-subtitle
                                    >Brand</v-list-item-subtitle
                                >
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>{{
                                    item.serial_no
                                }}</v-list-item-title>
                                <v-list-item-subtitle
                                    >Serial Number</v-list-item-subtitle
                                >
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>{{
                                    item.mk_tag_no
                                }}</v-list-item-title>
                                <v-list-item-subtitle
                                    >Mk Tag</v-list-item-subtitle
                                >
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col>
                        <div
                            class="d-flex align-center text-blue-grey-darken-3 mt-5"
                            style="gap: 1rem"
                        >
                            <v-icon>mdi-information-box-outline</v-icon>
                            <h2 class="text-h6">Advance Information</h2>
                        </div>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title>
                                    <v-chip
                                        :color="
                                            item.condition === 'working'
                                                ? 'green'
                                                : item.condition === 'damaged'
                                                ? 'orange'
                                                : 'red'
                                        "
                                        size="small"
                                        label
                                    >
                                        {{ item.condition }}
                                    </v-chip>
                                </v-list-item-title>
                                <v-list-item-subtitle
                                    >Device Condition</v-list-item-subtitle
                                >
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>
                                    <router-link
                                        :to="`/employee/${item.owned_by_employee?.id}/show`"
                                        class="text-blue-lighten-1"
                                        replace
                                        >{{ item.owned_by_employee?.full_name }}
                                    </router-link>
                                </v-list-item-title>
                                <v-list-item-subtitle
                                    >Active User</v-list-item-subtitle
                                >
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card-text>
            <!-- <v-card-actions>
                    <v-btn>Click me</v-btn>
                </v-card-actions> -->
        </v-card>
        <v-card class="mt-3">
            <v-card-title prepend-icon="mdi-history"
                >Device history</v-card-title
            >
            <v-table>
                <thead>
                    <tr>
                        <th>Tranferred Date</th>
                        <th>Surrendered Date</th>
                        <th>Officer in charge</th>
                        <th>Type of Transfer</th>
                        <th>Assigned employee</th>
                    </tr>
                </thead>
                <tbody class="descending">
                    <tr
                        v-for="(ei, index) in this.employeeInventory"
                        :key="index"
                    >
                        <td>{{ ei.transferred_date }}</td>
                        <td>{{ ei.surrendered_date }}</td>
                        <td>{{ ei.officer_in_charge }}</td>
                        <td>
                            <v-chip :color="ei.is_active ? 'green' : 'red'">{{
                                transferType(ei.is_active)
                            }}</v-chip>
                        </td>
                        <td>
                            <router-link
                                :to="`/employee/${ei.by_employee.id}/show`"
                                class="text-blue-lighten-1"
                            >
                                {{ ei.by_employee.full_name }}
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
    </v-container>
</template>
