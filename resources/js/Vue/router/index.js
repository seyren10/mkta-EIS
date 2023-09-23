import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../Layouts/MainLayout.vue";
import Login from "../Auth/Login.vue";
import { useUserStore } from "../stores/userStore";
export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "main-layout",
            component: MainLayout,
            children: [
                {
                    path: "",
                    name: "dashboard",
                    component: () => import("../Pages/Dashboard/Index.vue"),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: "category",
                    name: "category",
                    component: () => import("../Pages/Category/Index.vue"),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: "item",
                    name: "item",
                    component: () => import("../Pages/Item/Index.vue"),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: "employee",
                    name: "employee",
                    component: () => import("../Pages/Employee/Index.vue"),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: "location",
                    name: "location",
                    component: () => import("../Pages/Location/Index.vue"),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: "profile",
                    name: "profile",
                    component: () => import("../Pages/UserProfile/Index.vue"),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: "/:showable+/:id/show",
                    name: "show",
                    component: () => import("../components/Show.vue"),
                    meta: {
                        requiresAuth: true,
                    },
                },
            ],
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
    ],
});

router.beforeEach(async (to) => {
    const userStore = useUserStore();
    await userStore.getUser();

    if (to.meta.requiresAuth && !userStore.user)
        return { name: "login", replace: true };
});
