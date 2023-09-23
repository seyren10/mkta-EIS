<script>
export default {
    props: {
        additionalData: Object,
    },
};
</script>

<template>
    <v-list class="grid-2x2">
        <v-list-item
            v-for="(data, index) in additionalData"
            :key="index"
            class="list-item"
        >
            <v-list-item-title>{{ data.value }}</v-list-item-title>
            <v-list-item-subtitle>{{ data.title }}</v-list-item-subtitle>
        </v-list-item>
    </v-list>
</template>

<style scoped>
.grid-2x2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}
.list-item {
    border-left: 2px solid rgba(206, 206, 206, 0.719);
}
</style>
