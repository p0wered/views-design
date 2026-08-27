import { createRouter, createWebHistory } from 'vue-router';
import DesignEight from '@/views/DesignEight.vue';
import DesignFive from '@/views/DesignFive.vue';
import DesignFour from '@/views/DesignFour.vue';
import DesignNine from '@/views/DesignNine.vue';
import DesignOne from '@/views/DesignOne.vue';
import DesignSeven from '@/views/DesignSeven.vue';
import DesignSix from '@/views/DesignSix.vue';
import DesignTen from '@/views/DesignTen.vue';
import DesignThree from '@/views/DesignThree.vue';
import DesignTwo from '@/views/DesignTwo.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/design-1' },
    { path: '/design-1', alias: '/1', component: DesignOne },
    { path: '/design-2', alias: '/2', component: DesignTwo },
    { path: '/design-3', alias: '/3', component: DesignThree },
    { path: '/design-4', alias: '/4', component: DesignFour },
    { path: '/design-5', alias: '/5', component: DesignFive },
    { path: '/design-6', alias: '/6', component: DesignSix },
    { path: '/design-7', alias: '/7', component: DesignSeven },
    { path: '/design-8', alias: '/8', component: DesignEight },
    { path: '/design-9', alias: '/9', component: DesignNine },
    { path: '/design-10', alias: '/10', component: DesignTen },
    { path: '/:pathMatch(.*)*', redirect: '/design-1' }
  ],
  scrollBehavior: () => ({ top: 0 })
});
