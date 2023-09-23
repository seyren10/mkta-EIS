<template>
    <v-text-field
        type="text"
        variant="underlined"
        v-model="nameValue"
        @blur="updateNameValue"
        @keydown.enter="updateNameValue"
    />
</template>
<script>
export default {
    props: {
        userName: String,
    },
    data() {
        return {
            nameValue: this.userName,
        };
    },
    methods: {
        updateNameValue() {
            this.$emit("update", this.nameValue);
        },
    },
};
</script>
