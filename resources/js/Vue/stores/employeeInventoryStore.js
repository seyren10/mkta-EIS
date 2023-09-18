import { defineStore } from "pinia";

export const useEmployeeInventoryStore = defineStore("employee-inventory", {
    state: () => {
        return {
            employeeInventories: [],
            isLoading: false,
            errors: [],
        };
    },
    getters: {},
    actions: {
        async getEmployeeInventories() {},
        async postEmployeeInventories(data) {
            try {
                this.isLoading = true;
                this.errors = [];
                await axios.post("/api/employee-inventory", data);
            } catch (e) {
                console.log(e.message);
                this.errors = e.response.data.errors;
            } finally {
                this.isLoading = false;
                this.getEmployeeInventories();
            }
        },
        async deleteEmployeeInventories(data) {
            try {
                this.isLoading = true;
                this.errors = [];
                await axios.post(`/api/employee-inventory/dissociate`, data);
            } catch (e) {
                console.log(e.message);
                this.errors = e.response.data.errors;
            } finally {
                this.isLoading = false;
                this.getEmployeeInventories();
            }
        },
    },
});
