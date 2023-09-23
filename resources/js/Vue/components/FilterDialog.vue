<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" width="auto">
            <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
            </template>
            <v-card>
                <v-card-title> qwe </v-card-title>
                <v-card-text> rrrrr </v-card-text>
                <v-card-actions> 123123 </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
        };
    },
};
</script>
