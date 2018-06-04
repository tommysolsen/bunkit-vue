import HomePage from './pages/home.vue';
import AboutPage from './pages/about.vue';
import FormPage from './pages/form.vue';
import DynamicRoutePage from './pages/dynamic-route.vue';
import NotFoundPage from './pages/not-found.vue';

import PanelLeftPage from './pages/panel-left.vue';
import PanelRightPage from './pages/panel-right.vue';

import Search from './varetelling/search.vue'
import Count from './varetelling/count.vue'
import Entry from './varetelling/entries.vue'
export default [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/panel-left/',
    component: PanelLeftPage,
  },
  {
    path: '/panel-right/',
    component: PanelRightPage,
  },
  {
    path: '/search/',
    component: Search,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: "/entries/",
    component: Entry
  },
  {
    path: '/count/',
    component: Count,
  }, 
  {
    path: '/count/:initialCode/:initialQty',
    component: Count
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
