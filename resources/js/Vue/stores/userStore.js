import { defineStore } from "pinia";

export const useUserStore = defineStore("users", {
    state: () => {
        return { user: null, error: null };
    },
    actions: {
        async login(email, password) {
            await axios.get("/sanctum/csrf-cookie");
            try {
                const res = await axios.post("/api/login", {
                    email: email,
                    password: password,
                });
                this.user = res.data;
            } catch (e) {
                this.error = e.response.data.error;
            }
        },
    },
});
