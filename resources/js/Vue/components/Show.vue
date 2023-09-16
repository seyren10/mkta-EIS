<script>
import EmployeeShow from "../Pages/Employee/Show.vue";
import ItemShow from "../Pages/Item/Show.vue";
export default {
    data() {
        return {
            showPageTitle: this.$route.params.showable.toString()
        };
    },
    computed: {
        getShowableComponent() {
            switch (this.showPageTitle) {
                case "employee":
                    return EmployeeShow;
                case "item":
                    return ItemShow;
            }
        },
    },
    created() {
        this.$watch(()=> this.$route.params.showable,(to,from)=>{
            console.log('to:',to,' from: ',from)
            this.showPageTitle = to?.at(0) || from.at(0)
        })
    }
};
</script>

<template>
    <v-container>
        <div class="d-flex items-end" style="gap: 2rem">
            <v-btn
                icon="mdi-keyboard-backspace"
                color="blue-grey-lighten-5"
                @click="this.$router.back()"
            ></v-btn>
            <h1 class="proper text-h4">{{ showPageTitle }} information</h1>
        </div>
        <component :is="getShowableComponent" ></component>
    </v-container>
</template>

<style scoped>
.proper::first-letter {
    text-transform: uppercase;
}
</style>
