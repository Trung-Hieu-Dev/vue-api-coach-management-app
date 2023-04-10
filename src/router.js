import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// components
import CoachesList from './pages/coaches/CoachesList.vue';
import NotFound from './pages/NotFound.vue';

//store
import store from './store/index';

const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');

const CoachRegister = defineAsyncComponent(() =>
  import('./pages/coaches/CoachRegistation.vue')
);
const ContactCoach = defineAsyncComponent(() =>
  import('./pages/requests/ContactCoach.vue')
);
const RequestsReceived = defineAsyncComponent(() =>
  import('./pages/requests/RequestsReceived.vue')
);
const UserAuth = () => import('./pages/auth/UserAuth.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      props: true,
      component: CoachDetail,
      children: [
        { path: 'contact', component: ContactCoach, name: 'contact' }, // coaches/c1/contact
      ],
    },
    {
      path: '/register',
      component: CoachRegister,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    }, // show all requests list
    {
      path: '/auth',
      component: UserAuth,
      meta: { requiresUnauth: true },
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

//navigation guards
router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresAuth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
