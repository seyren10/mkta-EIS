<template>
    <v-chip :color="color" size="small">
        {{ list }}
    </v-chip>
</template>

<script>
export default {
    props: {
        list: String,
        listType: String,
    },

    computed: {
        color() {
            if (this.listType === "condition") {
                switch (this.list) {
                    case "good":
                        return "green";
                    case "fair":
                        return "yellow";
                    case "bad":
                        return "orange";
                    case "for disposal":
                        return "red-accent-1";
                    case "disposed":
                        return "red";
                    default:
                        return "grey";
                }
            }
            return "grey";
        },
    },
};
</script>
