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
                const res = await axios.post("/api/location", location);

                this.locations.unshift(res.data.data);
            } catch (e) {
                console.log(e.message);
                this.errors = e.response.data.errors;
            } finally {
                this.isLoading = false;
            }
        },
        async updateLocation(id, location) {
            try {
                this.isLoading = true;
                this.errors = {};
                const res = await axios.put(`/api/location/${id}`, location);

                const oldLocation = this.locations.find(location);
                oldLocation = res.data.data;
            } catch (e) {
                console.log(e.message);
                this.errors = e.response?.data.errors ?? {};
            } finally {
                this.isLoading = false;
            }
        },
        async deleteLocation(id) {
            try {
                this.isLoading = true;
                this.errors = {};
                const res = await axios.delete(`/api/location/${id}`);

                this.locations.splice(this.locations.indexOf(res.data.data), 1);
            } catch (e) {
                console.log(e.message);
                this.errors = e.response.data.errors;
            } finally {
                this.isLoading = false;
            }
        },
    },
});
