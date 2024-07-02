import { createRouter, createWebHashHistory } from 'vue-router';

const Browse = () => import('./pages/Browse.vue');
const Entity = () => import('./pages/Entity.vue');
// const People = () => import('./pages/People.vue');
// const NotFound = () => import('./pages/NotFound.vue');

const routes = [
  { path: '/', component: Browse },
  { path: '/browse/:filter', component: Browse, props: true },
  { path: '/entity/:type/:id', component: Entity },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
