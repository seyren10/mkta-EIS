<script>
import Create from "./Create.vue";
import { useLocationStore } from "../../stores/locationStore";
import { storeToRefs } from "pinia";
export default {
    async setup() {
        const locationStore = useLocationStore();
        await locationStore.getLocations();

        const { locations, errors, isLoading } = storeToRefs(locationStore);
        return { locations, locationStore, errors, isLoading };
    },
    data() {
        return {};
    },
    components: { Create },
    methods: {
        async update(location) {
            await this.locationStore.updateLocation(location.id, location);

            if (!Object.keys(this.errors).length) {
                this.dialog = false;

                this.form = {
                    name: null,
                };
            }
        },
    },
};
</script>

<template>
    <v-container>
        <Create class="mb-5" />
        <v-row style="gap: 1rem">
            <v-card
                max-width="200"
                density="compact"
                v-for="location in locations"
                :key="location.id"
                class="w-100"
            >
                <v-card-text class="text-h5 py-2">
                    <v-text-field
                        v-model="location.name"
                        :readOnly="location.id === 1"
                        :loading="isLoading"
                    ></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-list-item class="w-100">
                        <template v-slot:append v-if="location.id !== 1">
                            <div class="justify-self-end">
                                <v-btn
                                    prepend-icon="mdi-update"
                                    class="text-none"
                                    variant="outlined"
                                    color="blue-lighten-1"
                                    size="small"
                                    @click="update(location)"
                                    :loading="isLoading"
                                    >Update</v-btn
                                >
                                <v-btn
                                    prepend-icon="mdi-delete"
                                    class="text-none"
                                    color="red-lighten-1"
                                    variant="flat"
                                    size="small"
                                    >Delete</v-btn
                                >
                            </div>
                        </template>
                    </v-list-item>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>
