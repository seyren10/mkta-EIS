import { defineStore } from "pinia";

export const useEmployeeStore = defineStore("employees", {
    state: () => {
        return {
            employees: [],
            isLoading: false,
            errors: [],
        };
    },
    getters: {
        activeEmployees: (state) => {
            return state.employees.filter((emp) => emp.is_active);
        },
    },
    actions: {
        async getEmployees() {
            const res = await axios.get("/api/employee");

            this.employees = res.data.data;
        },
        async postEmployee(employee) {
            try {
                this.isLoading = true;
                this.errors = [];
                await axios.post("/api/employee", employee);
            } catch (e) {
                console.log(e.message);
                this.errors = e.response.data.errors;
            } finally {
                this.isLoading = false;
                this.getEmployees();
            }
        },
        async updateEmployee(id, employee) {
            try {
                this.isLoading = true;
                this.errors = [];
                await axios.put(`/api/employee/${id}`, employee);
            } catch (e) {
                console.log(e.message);
                this.errors = e.response.data.errors;
            } finally {
                this.isLoading = false;
                this.getEmployees();
            }
        },
    },
});
