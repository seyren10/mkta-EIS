<script>
export default {
    props: {
        additionalData: Object,
    },
};
</script>

<template>
    <v-row>
        <v-col>
            <v-list>
                <v-list-item>
                    <v-list-item-title>{{
                        additionalData.processor ?? "No Data available"
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Processor</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>{{
                        additionalData.motherboard ?? "No Data available"
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Motherboard</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>{{
                        additionalData.memory ?? "No Data available"
                    }}</v-list-item-title>
                    <v-list-item-subtitle>RAM/Memory</v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </v-col>
        <v-col>
            <v-list>
                <v-list-item>
                    <v-list-item-title>{{
                        additionalData.storage ?? "No Data available"
                    }}</v-list-item-title>
                    <v-list-item-subtitle>HDD/SSD/Storage</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>{{
                        additionalData.peripherals ?? "No Data available"
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Peripherals</v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </v-col>
    </v-row>
</template>
