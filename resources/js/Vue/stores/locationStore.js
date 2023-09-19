import { defineStore } from "pinia";

export const useLocationStore = defineStore("locations", {
    state: () => {
        return {
            locations: [],
            isLoading: false,
            errors: {},
        };
    },
    getters: {},
    actions: {
        async getLocations() {
            const res = await axios.get("/api/location");

            this.locations = res.data.data;
        },
        async addLocation(location) {
            try {
                this.isLoading = true;
                this.errors = {};
                await axios.post("/api/location", location);
            } catch (e) {
                console.log(e.message);
                this.errors = e.response.data.errors;
            } finally {
                this.isLoading = false;
                this.getLocations();
            }
        },
        async updateLocation(id, location) {
            try {
                this.isLoading = true;
                this.errors = {};
                await axios.put(`/api/location/${id}`, location);
            } catch (e) {
                console.log(e.message);
                this.errors = e.response.data.errors;
            } finally {
                this.isLoading = false;
                this.getLocations();
            }
        },
        async deleteLocation(id) {
            try {
                this.isLoading = true;
                this.errors = {};
                await axios.delete(`/api/location/${id}`);
            } catch (e) {
                console.log(e.message);
                this.errors = e.response.data.errors;
            } finally {
                this.isLoading = false;
                this.getLocations();
            }
        },
    },
});
