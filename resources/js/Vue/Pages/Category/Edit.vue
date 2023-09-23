<script>
import { useCategoryStore } from "../../stores/categoryStore";
import { storeToRefs } from "pinia";
import CustomAttribute from "./components/CustomAttribute.vue";
export default {
    setup() {
        const categoryStore = useCategoryStore();
        const { errors, isLoading } = storeToRefs(categoryStore);
        return { categoryStore, errors, isLoading };
    },
    props: {
        category: Object,
    },
    emits: ["change", "close"],
    data() {
        return {
            dialog: false,
            form: {
                name: this.category.name,
                description: this.category.description,
            },
            customAttributes: JSON.parse(this.category.json_attr),
        };
    },
    methods: {
        async update() {
            await this.categoryStore.updateCategory(this.category.id, {
                ...this.form,
                json_attr: this.customAttributes,
            });

            if (!Object.keys(this.errors).length) {
                this.form = {
                    name: this.category.name,
                    description: this.category.description,
                };
                this.dialog = false;
            }
        },
        handleCustomAttribute(attributes) {
            this.customAttributes = attributes;
        },
    },
    components: { CustomAttribute },
};
</script>

<template>
    <v-card>
        <v-card-actions fixed-header>
            Update Category
            <v-spacer />
            <v-btn
                fab
                class="bg-danger"
                icon="mdi-close"
                @click="$emit('close')"
            />
        </v-card-actions>
        <v-container>
            <v-row>
                <v-form style="width: 100%" @submit.prevent="update">
                    <v-col cols="12">
                        <v-text-field
                            label="Name*"
                            v-model="form.name"
                            :error="errors.name"
                            :error-messages="errors.name"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            label="Description"
                            v-model="form.description"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <h1 class="text-subtitle-1">Custom Attributes</h1>
                        <CustomAttribute
                            :customAttribute="customAttributes"
                            v-on:change="handleCustomAttribute"
                        />
                    </v-col>

                    <v-col cols="12"
                        ><v-btn
                            block
                            variant="flat"
                            color="blue-lighten-1"
                            type="submit"
                            :loading="isLoading"
                            >Update Category</v-btn
                        ></v-col
                    >
                </v-form>
            </v-row>
        </v-container>
    </v-card>
    <!-- </v-dialog> -->
    <!-- </v-row> -->
</template>
