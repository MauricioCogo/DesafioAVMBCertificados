import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import ImportView from '../views/ImportView.vue';
import ValidateView from '../views/ValidateView.vue';
import RegisterView from '../views/RegisterView.vue';

const routes = [
    { path: '/', component: LoginView },
    { path: '/register', component: RegisterView },
    { path: '/dashboard', component: DashboardView },
    { path: '/import', component: ImportView },
    { path: '/validate', component: ValidateView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;