<script>
export default {
    props: {
        employeeInventory: Array,
    },
    methods: {
        transferType(isActive) {
            if (isActive) {
                return "Transfer";
            } else return "Surrender";
        },
    },
};
</script>

<template>
    <v-card class="mt-3">
        <v-card-title prepend-icon="mdi-history">Device history</v-card-title>
        <v-table>
            <thead>
                <tr>
                    <th>Tranferred Date</th>
                    <th>Officer in charge</th>
                    <th>Type of Transfer</th>
                    <th>Assigned employee</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(ei, index) in this.employeeInventory" :key="index">
                    <td>{{ ei.transferred_date }}</td>
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
</template>
