<template>
    <div class="h-full w-full">
        <div class="flex justify-between items-center px-8 bg-background-secondary py-4">
            <router-link
                to="/"
                class="bg-background-primary text-background-secondary px-3 py-2 rounded-lg"
                >Back to Contacts</router-link
            >
            <h1 class="text-2xl font-bold text-background-primary">Contact Detail</h1>
        </div>
        <div v-if="contactStore.currentContact.loading" class="flex justify-center">
            <Loader />
        </div>
        <div v-else-if="contactStore.currentContact.errorMessage" class="flex justify-center mt-44">
            <h1 class="text-center text-2xl">There's no data found</h1>
        </div>
        <div v-else class="px-4">
            <div
                class="flex flex-col gap-10 justify-center items-center mt-44 border md:w-1/2 w-full mx-auto rounded-xl p-8 border-background-secondary"
            >
                <h2 class="text-blue text-2xl">Name: {{ currentContact?.name }}</h2>
                <p class="text-blue text-2xl">Email: {{ currentContact?.email }}</p>
                <p class="text-blue text-2xl">Phone: {{ currentContact?.phone }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useContacts } from '@/stores/contacts'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import type { IContactData } from '@/interface/IContact'

// Components
import Loader from '@/components/Base/Loader.vue'

const contactStore = useContacts()
const route = useRoute()
const contactId = route.params.id

const currentContact = computed((): IContactData => contactStore.getCurrentContact?.contact)

const fetchContact = async (id: string) => {
    contactStore.currentContact.loading = true
    const [res, err] = await contactStore.fetchCurrentContact(id)

    if (res) {
        contactStore.currentContact.contact = res.data
        contactStore.currentContact.errorMessage = ''
    }
    if (err) {
        contactStore.currentContact.errorMessage = err.response.data.message
    }

    contactStore.currentContact.loading = false
}

onBeforeMount(() => {
    fetchContact(contactId.toString())
})
</script>
