<script>
export default {
    props: ["customAttribute"],
    emits: ["change"],
    data() {
        return {
            dataTypes: ["text", "date", "number"],
            attr: this.customAttribute ?? [],
            new_attr: {
                title: "",
                type: "text",
                value: null,
            },
        };
    },
    methods: {
        saveAttr() {
            let sample = this.new_attr;
            this.attr.push(JSON.parse(JSON.stringify(sample)));

            this.new_attr = {
                title: "",
                type: "text",
                value: null,
            };
            this.$emit("change", this.attr);
        },
        deleteAttr(index) {
            this.attr.splice(index, 1);
            this.$emit("change", this.attr);
        },
    },
};
</script>

<template>
    <v-table>
        <thead>
            <tr>
                <td>Field</td>
                <td>Type</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(att, index) in attr">
                <td>
                    <v-text-field v-model="att.title" />
                </td>
                <td>
                    <v-select v-model="att.type" :items="dataTypes"></v-select>
                </td>
                <td>
                    <v-icon @click="deleteAttr(index)">mdi-close</v-icon>
                </td>
            </tr>
            <tr>
                <td>
                    <v-text-field v-model="new_attr.title" />
                </td>
                <td>
                    <v-select
                        v-model="new_attr.type"
                        :items="dataTypes"
                    ></v-select>
                </td>
                <td>
                    <v-icon @click="saveAttr">mdi-plus</v-icon>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>
