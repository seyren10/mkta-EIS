<script>
import { storeToRefs } from "pinia";
import { useUserStore } from "./stores/userStore";

export default {
    setup() {
        const userStore = useUserStore();
        const { user } = storeToRefs(userStore);

        return { user, userStore };
    },
    // async created() {
    //     await this.userStore.getUser();
    // },
    //AUTO FETCH THE STORE WHEN DATA CHANGES
    // watch: {
    //     user: {
    //         handler(newUser) {
    //             this.userStore.getUser();
    //         },
    //         immediate: true,
    //     },
    // },
};
</script>
<template>
    <router-view> </router-view>
</template>
