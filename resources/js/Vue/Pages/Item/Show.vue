<script>
export default {
    data() {
        return {
            item: {},
        };
    },

    methods: {
        async fetchItem() {
            const res = await axios.get(`/api/item/${this.$route.params.id}`);
            this.item = res.data.data;
        },
    },
    created() {
        this.fetchItem();
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
                                    {{
                                        item.owned_by_employee?.full_name
                                    }}</v-list-item-title
                                >
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
        </v-card>
    </v-container>
</template>
