import { defineStore } from "pinia";

export const useCategoryStore = defineStore("categories", {
    state: () => {
        return {
            categories: [],
            errors: {},
            isLoading: false,
        };
    },
    getters: {},
    actions: {
        async getCategories() {
            const res = await axios.get("/api/category");
            this.categories = res.data.data;
        },
        async addCategory(category) {
            try {
                this.isLoading = true;
                this.errors = [];
                await axios.post(`/api/category`, category);
            } catch (e) {
                console.log(e.message);
                this.errors = e.response.data.errors;
            } finally {
                this.isLoading = false;
                this.getCategories();
            }
        },
        async updateCategory(id, category) {
            try {
                this.isLoading = true;
                this.errors = [];

                await axios.put(`/api/category/${id}`, category);
            } catch (e) {
                console.log(e.message);
                this.errors = e.response.data.errors;
            } finally {
                this.isLoading = false;
                this.getCategories();
            }
        },
    },
});
