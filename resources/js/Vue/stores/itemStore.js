import { defineStore } from "pinia";

export const useItemStore = defineStore("items", {
    state: () => {
        return {
            items: [],
            isLoading: false,
            errors: [],
        };
    },
    getters: {
        getItemCountByCategory: (state) => {
            return (categoryId) => {
                return state.items.reduce((acc, item) => {
                    if (item.category.id === categoryId) {
                        return (acc += 1);
                    }
                }, 0);
            };
        },
    },
    actions: {
        async getItems() {
            const res = await axios.get("/api/item");

            this.items = res.data.data;
        },
        async postItem(item) {
            try {
                this.isLoading = true;
                this.errors = [];
                const res = await axios.post("/api/item", item);
                return res;
            } catch (e) {
                console.log(e.message);
                this.errors = e.response.data.errors;
            } finally {
                this.isLoading = false;
                await this.getItems();
            }
        },
        async updateItem(id, item) {
            try {
                this.isLoading = true;
                this.errors = [];
                await axios.put(`/api/item/${id}`, item);
            } catch (e) {
                console.log(e.message);
                this.errors = e.response.data.errors;
            } finally {
                this.isLoading = false;
                // this.getItems();
            }
        },
    },
});
