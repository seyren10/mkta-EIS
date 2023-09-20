<script>
import { storeToRefs } from "pinia";
import { useItemStore } from "../../stores/itemStore";
import { useEmployeeStore } from "../../stores/employeeStore";

export default {
    async setup() {
        const itemStore = useItemStore();
        await itemStore.getItems();
        const employeeStore = useEmployeeStore();
        await employeeStore.getEmployees();
        const { employees } = storeToRefs(employeeStore);
        const { items } = storeToRefs(itemStore);

        return { items, employees };
    },
    data() {
        return {};
    },

    computed: {
        totalItems() {
            return this.items.length;
        },
        totalEmployees() {
            return this.employees.length;
        },
    },
    methods: {
        getItemCount(status) {
            return this.items.reduce((a, c) => {
                return c.status === status ? (a += 1) : a;
            }, 0);
        },

        getEmployeeCountByStatus(active) {
            return this.employees.reduce(
                (a, c) => (c.is_active == active ? (a += 1) : a),
                0
            );
        },
    },
};
</script>

<template>
    <h1 class="text-button">Admin Dashboard</h1>
    <v-row>
        <v-col class="col">
            <div>
                <v-card color="primary" class="dashboard-item">
                    <router-link :to="{ name: 'item' }">
                        <v-card-title>Total Devices</v-card-title>
                        <v-card-text class="text-h3">
                            {{ totalItems }}
                        </v-card-text>
                        <v-icon class="icon">mdi-devices</v-icon>
                    </router-link>
                </v-card>
                <p class="text-caption">Device Status</p>
                <div class="dashboard-sub">
                    <v-chip color="green-darken-3">
                        <div>Good</div>
                        <div class="count">{{ getItemCount("good") }}</div>
                    </v-chip>
                    <v-chip color="yellow-darken-3">
                        <div>Fair</div>
                        <div class="count">{{ getItemCount("fair") }}</div>
                    </v-chip>
                    <v-chip color="orange-darken-3">
                        <div>Bad</div>
                        <div class="count">{{ getItemCount("bad") }}</div>
                    </v-chip>
                    <v-chip color="orange-darken-4">
                        <div>For Disposal</div>
                        <div class="count">
                            {{ getItemCount("for disposal") }}
                        </div>
                    </v-chip>
                    <v-chip color="red-accent-3">
                        <div>Disposed</div>
                        <div class="count">{{ getItemCount("disposed") }}</div>
                    </v-chip>
                </div>
            </div>
            <div>
                <v-card color="secondary" class="dashboard-item">
                    <router-link :to="{ name: 'employee' }">
                        <v-card-title>Total Employees</v-card-title>
                        <v-card-text class="text-h3">
                            {{ totalEmployees }}
                        </v-card-text>
                        <v-icon class="icon">mdi-account-group</v-icon>
                    </router-link>
                </v-card>
                <p class="text-caption">User Status</p>
                <div class="dashboard-sub">
                    <v-chip color="green-darken-3">
                        <div>Active</div>
                        <div class="count">
                            {{ getEmployeeCountByStatus(true) }}
                        </div>
                    </v-chip>
                    <v-chip color="red-darken-3">
                        <div>Inactive</div>
                        <div class="count">
                            {{ getEmployeeCountByStatus(false) }}
                        </div>
                    </v-chip>
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<style scoped>
.dashboard-item {
    position: relative;
    padding: 1rem 0.3rem;
    min-width: 17rem;
    & > a {
        text-decoration: none;
        color: white;
    }
}
.icon {
    position: absolute;
    right: 1rem;
    bottom: 0;
    font-size: 5rem;
    color: hsl(0 0% 100% / 0.5);
}
.col {
    display: flex;
    gap: 2rem;
    align-items: start;
}

.dashboard-sub {
    /* margin-block-start: 1rem; */
    padding: 0.2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    gap: 0.5rem;
}

.dashboard-sub > span {
    border-radius: 0.3em;
    padding: 0.2rem;
    font-size: 0.9rem;
    display: grid;
    width: 100%;
    height: 100%;
    align-items: start;
}

.dashboard-sub .count {
    margin-inline-start: 1rem;
    position: absolute;
    right: 1rem;
    /* position: absolute;
    bottom: 50%;
    transform: translateY(50%); */
    font-weight: 300;
    font-size: 1.3rem;
}
</style>
