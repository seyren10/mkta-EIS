<script>
import HistoryShow from "./ShowComponents/HistoryShow.vue";
import BasicInfoShow from "./ShowComponents/BasicInfoShow.vue";
import AdditionalInfoShow from "./ShowComponents/AdditionalInfoShow.vue";

import { useRoute } from "vue-router";

export default {
    async setup() {
        const route = useRoute();
        const itemRes = await axios.get(`/api/item/${route.params.id}`);
        const item = itemRes.data.data;

        const eiRes = await axios.get(
            `/api/employee-inventory/${route.params.id}`
        );
        const employeeInventory = eiRes.data.data;

        return {
            item,
            employeeInventory,
        };
    },
    components: { HistoryShow, BasicInfoShow, AdditionalInfoShow },
    data() {
        return {
            tab: null,
            tabData: [
                {
                    value: 1,
                    title: "Basic Info",
                    component: "BasicInfoShow",
                    props: {
                        item: this.item,
                    },
                    icon: "mdi-devices",
                },
                {
                    value: 2,
                    title: "Additional Info",
                    component: "AdditionalInfoShow",
                    props: {
                        additionalData: JSON.parse(this.item.json_attr),
                    },
                    icon: "mdi-information-box-outline",
                },
                {
                    value: 3,
                    title: "Device History",
                    component: "HistoryShow",
                    props: {
                        employeeInventory: this.employeeInventory,
                    },
                    icon: "mdi-history",
                },
            ],
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
    },
    created() {
        this.fetchItem();
        this.fetchEmployeeInventory();
    },
};
</script>

<template>
    <v-card class="mt-2">
        <v-tabs v-model="tab" color="blue-lighten-1">
            <v-tab
                v-for="tab in tabData"
                :value="tab.value"
                :prepend-icon="tab.icon"
                :key="tab.value"
                >{{ tab.title }}</v-tab
            >
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item
                v-for="tab in tabData"
                :key="tab.value"
                :value="tab.value"
            >
                <v-container>
                    <component :is="tab.component" v-bind="tab.props" />
                </v-container>
            </v-window-item>
        </v-window>
    </v-card>

    <v-container> </v-container>
</template>
