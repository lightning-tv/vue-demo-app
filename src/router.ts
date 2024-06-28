import { createRouter, createWebHashHistory } from 'vue-router';

const Browse = () => import('./pages/Browse.vue');
// const Portal = () => import('./pages/Portal.vue');
// const Grid = () => import('./pages/Grid.vue');
// const TextPage = () => import('./pages/TextPage.vue');
// const ButtonsPage = () => import('./pages/ButtonsPage.vue');
// const FlexPage = () => import('./pages/FlexPage.vue');
// const CreatePage = () => import('./pages/CreatePage.vue');
// const ViewportPage = () => import('./pages/ViewportPage.vue');
// const FlexSizePage = () => import('./pages/FlexSizePage.vue');
// const FlexColumnSizePage = () => import('./pages/FlexColumnSizePage.vue');
// const FlexColumnPage = () => import('./pages/FlexColumnPage.vue');
// const SuperFlexPage = () => import('./pages/SuperFlexPage.vue');
// const ButtonsMaterialPage = () => import('./pages/ButtonsMaterialPage.vue');
// const People = () => import('./pages/People.vue');
const Entity = () => import('./pages/Entity.vue');
// const NotFound = () => import('./pages/NotFound.vue');

const routes = [
  { path: '/', component: Browse },
  { path: '/browse/:filter', component: Browse },
//   { path: '/examples', component: Portal },
//   { path: '/grid', component: Grid },
//   { path: '/text', component: TextPage },
//   { path: '/buttons', component: ButtonsPage },
//   { path: '/flex', component: FlexPage },
//   { path: '/create', component: CreatePage },
//   { path: '/viewport', component: ViewportPage },
//   { path: '/flexsize', component: FlexSizePage },
//   { path: '/flexcolumnsize', component: FlexColumnSizePage },
//   { path: '/flexcolumn', component: FlexColumnPage },
//   { path: '/superflex', component: SuperFlexPage },
//   { path: '/buttonsmaterial', component: ButtonsMaterialPage },
//   { path: '/entity/people/:id', component: People },
   { path: '/entity/:type/:id', component: Entity },
//   { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
