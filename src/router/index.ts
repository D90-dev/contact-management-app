// @ts-ignore-next-line
import Main from '@/views/Main.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main
        },
        // Using dynamic component import
        {
            name: 'contact-detail',
            path: '/contact/:id',
            // @ts-ignore-next-line
            component: () => import('@/views/ContactDetailView.vue'),
            props: true
        }
    ]
})

export default router
