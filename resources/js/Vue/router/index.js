import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../Layouts/MainLayout.vue";
import Login from "../Auth/Login.vue";

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
                },
                {
                    path: "category",
                    name: "category",
                    component: () => import("../Pages/Category/Index.vue"),
                },
                {
                    path: "item",
                    name: "item",
                    component: () => import("../Pages/Item/Index.vue"),
                },
                {
                    path: "employee",
                    name: "employee",
                    component: () => import("../Pages/Employee/Index.vue"),
                },
                {
                    path: "/:showable+/:id/show",
                    name: "show",
                    component: () => import("../components/Show.vue"),
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
