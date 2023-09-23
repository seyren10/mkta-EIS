import { defineStore } from "pinia";
import { router } from "../router";
export const useUserStore = defineStore("users", {
    state: () => {
        return { user: null, error: null, loading: false };
    },
    actions: {
        async login(email, password) {
            this.loading = true;
            await axios.get("/sanctum/csrf-cookie");
            try {
                const res = await axios.post("/login", {
                    email: email,
                    password: password,
                });
                this.user = res.data;
                router.push({ name: "dashboard" });
            } catch (e) {
                this.error = e.response.data.message;
            } finally {
                this.loading = false;
            }
        },
        async getUser() {
            try {
                const res = await axios.get("/api/user");
                this.user = res.data;
            } catch (e) {
                // this.error = e.response.data.message;
            }
        },
        async logout() {
            try {
                await axios.delete("/logout");
                this.user = null;
                this.router.push({ name: "login" });
            } catch (e) {}
        },
        async setPasswordFirstTime(data) {
            try {
                await axios.put("/set-password-first-time", data);
                await this.logout();
            } catch (e) {}
        },
        async updateName(data) {
            try {
                await axios.put("/update-name", data);
                await this.getUser();
            } catch (e) {}
        },
    },
});
