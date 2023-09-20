<script>
import Chip from "../../../components/Chip.vue";
export default {
    components: { Chip },
    props: {
        item: Object,
    },
};
</script>

<template>
    <v-row>
        <v-col>
            <div
                class="d-flex align-center text-blue-grey-darken-3 mt-5"
                style="gap: 1rem"
            ></div>
            <v-list>
                <v-list-item>
                    <v-list-item-title>{{
                        item.category?.name
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Device Type</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>{{ item.model }}</v-list-item-title>
                    <v-list-item-subtitle>Model</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>{{ item.brand }}</v-list-item-title>
                    <v-list-item-subtitle>Brand</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>{{ item.serial_no }}</v-list-item-title>
                    <v-list-item-subtitle>Serial Number</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>{{ item.mk_tag_no }}</v-list-item-title>
                    <v-list-item-subtitle>Mk Tag</v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </v-col>
        <v-col>
            <div
                class="d-flex align-center text-blue-grey-darken-3 mt-5"
                style="gap: 1rem"
            ></div>
            <v-list>
                <v-list-item>
                    <v-list-item-title>
                        <Chip :list="item.status" listType="condition" />
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
                    <v-list-item-subtitle>Active User</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>{{
                        item.date_purchased
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Purchased Date</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>{{
                        item.accountability_no
                    }}</v-list-item-title>
                    <v-list-item-subtitle
                        >Accountability Number</v-list-item-subtitle
                    >
                </v-list-item>
            </v-list>
        </v-col>
    </v-row>
</template>
