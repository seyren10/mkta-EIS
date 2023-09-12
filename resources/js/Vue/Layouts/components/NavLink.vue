<script>
export default {
    props: {
        links: Array,
    },
};
</script>

<template>
    <router-link
        style="text-decoration: none; color: currentColor"
        v-for="(link, index) in links"
        :to="link.to"
        :key="index"
    >
        <v-list-item
            :prepend-icon="link.icon"
            :title="link.title"
            :value="link.value"
        >
        </v-list-item>
    </router-link>
</template>

<style scoped>
.router-link-exact-active {
    color: #29b6f6 !important;
}
</style>
