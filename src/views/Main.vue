<template>
    <div class="bg-background-secondary py-5">
        <h1 class="text-3xl text-center text-white">Contact List</h1>
    </div>
    <div class="md:flex justify-end px-5 hidden">
        <button
            @click="openModal"
            class="bg-background-secondary text-white flex items-center gap-3 py-4 px-5 rounded-md mt-5 justify-end text-end"
        >
            <img
                src="/icons/add-plus-svgrepo-com.svg"
                alt="icon"
                class="w-6 h-6 mx-auto rounded-full"
            />
            New Contact
        </button>
    </div>
    <div v-if="contactStore.allContacts.loading" class="flex justify-center">
        <Loader />
    </div>
    <div v-else-if="contactStore.allContacts.errorMessage" class="flex justify-center mt-44">
        <h1 class="text-center text-2xl">No Data Found</h1>
    </div>
    <div v-else>
        <div
            v-if="contacts.length"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 p-5 mt-4"
        >
            <div
                v-for="user in contacts"
                :key="user.id"
                @click="() => handleNavigate(user.id)"
                class="bg-background-primary p-10 transition-colors ease-linear duration-300 hover:cursor-pointer hover:bg-background-gray rounded-lg relative"
            >
                <ContactCard :data="user" />
                <DropDown
                    :data="options"
                    @click.stop="(e) => e"
                    @handleChange="(option) => handleAction(option, user.id)"
                />
            </div>
        </div>
        <div v-else>
            <h1 class="text-center text-background-secondary mt-5">No Contacts</h1>
        </div>
    </div>
    <div class="fixed md:hidden block right-0 bottom-0 p-8 cursor-pointer" @click="openModal">
        <img
            src="/icons/add-circle-svgrepo-com.svg"
            alt="icon"
            class="w-25 h-20 mx-auto rounded-full"
        />
    </div>
    <Modal
        v-if="showModal"
        @close="showModal = false"
        @submit="handleSubmit"
        :isLoading="contactStore.allContacts.loading"
    >
        <template #title>
            <h1 class="text-2xl text-center text-background-secondary">{{ modalTitle }}</h1>
        </template>
        <template #content>
            <div class="flex flex-col gap-3">
                <div>
                    <Input
                        label="Name"
                        placeholder="Enter Name"
                        v-model="payload.name"
                        name="name"
                    />
                    <span class="text-red-500 px-2" v-if="v$.name?.$error">{{
                        v$.name?.required.$message
                    }}</span>
                </div>
                <div>
                    <Input
                        label="Email"
                        placeholder="Enter Email"
                        v-model="payload.email"
                        name="email"
                    />
                    <span v-if="v$.email?.$error" class="text-red-500 px-2">
                        {{ getEmailErrorMessage }}
                    </span>
                </div>
                <div>
                    <Input
                        label="Phone"
                        placeholder="Enter Phone"
                        v-model="payload.phone"
                        name="phone"
                    />

                    <span v-if="v$.phone?.$error" class="text-red-500 px-2">
                        {{ getPhoneErrorMessage }}
                    </span>
                </div>
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { options } from '@/helpers/constants'
import { useContacts } from '@/stores/contacts'
import { required, numeric, email } from '@vuelidate/validators'
import type { ICreateContact, IContactData } from '@/interface/IContact'
import { useVuelidate } from '@vuelidate/core'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useRouter } from 'vue-router'

// Components
import Loader from '@/components/Base/Loader.vue'
import Modal from '@/components/Base/Modal.vue'
import Input from '@/components/Base/Input.vue'
import ContactCard from '@/components/ContactCard.vue'
import DropDown from '@/components/Base/DropDown.vue'

const contactStore = useContacts()
const showModal = ref<boolean>(false)
const actionType = ref<string>('')
const router = useRouter()
const payload = ref<ICreateContact>({
    id: '',
    name: '',
    email: '',
    phone: ''
})

const rules = computed(() => {
    return {
        name: { required },
        email: { required, email },
        phone: {
            required,
            numeric
        }
    }
})
const contacts = computed(() => contactStore.getContacts)

const modalTitle = computed(() => {
    return actionType.value === 'add' ? 'Add New Contact' : 'Edit Contact'
})

const getPhoneErrorMessage = computed(() => {
    return v$.value.phone.required.$invalid
        ? 'Value is required'
        : 'Phone number should be a valid number'
})

const getEmailErrorMessage = computed(() => {
    return v$.value.email.required.$invalid
        ? 'Value is required'
        : 'Email should be a valid email'
})
const v$ = useVuelidate(rules, payload)

const handleNavigate = (id: number | string) => {
    router.push({ name: 'contact-detail', params: { id } })
}

const handleAction = async (option: string, id: number | string) => {
    actionType.value = option
    if (option === 'Edit') {
        showModal.value = true
        const data = contactStore.allContacts.contacts.find((contact) => contact.id === id)
        payload.value = {
            id: data?.id,
            name: data?.name,
            email: data?.email,
            phone: data?.phone
        }
        v$.value.$reset()
    }
    if (option === 'Delete') {
        contactStore.allContacts.loading = true
        const [res, err] = await contactStore.deleteContact(id)
        contactStore.allContacts.loading = false
        if (res) {
            toast.success(res.data.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            fetchContacts()
        }
        if (err) {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }
}

const openModal = () => {
    actionType.value = 'add'
    showModal.value = true
    payload.value = {
        id: '',
        name: '',
        email: '',
        phone: ''
    }
}

const handleSubmit = async () => {
    v$.value.$touch()
    if (actionType.value === 'add') {
        if (!v$.value.$invalid) {
            showModal.value = false
            contactStore.allContacts.loading = true
            const [res, err] = await contactStore.createContact(payload.value)
            contactStore.allContacts.loading = false
            if (res) {
                contactStore.allContacts.errorMessage = ''
                toast.success(res.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                fetchContacts()
            }
            if (err) {
                contactStore.allContacts.errorMessage = err.response.data.message
                toast.error(err.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
        }
    }
    if (actionType.value === 'Edit') {
        if (!v$.value.$invalid) {
            showModal.value = false
            contactStore.allContacts.loading = true
            const [res, err] = await contactStore.updateContact(payload.value.id, payload.value)
            contactStore.allContacts.loading = false
            if (res) {
                fetchContacts()
                toast.success(res.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            if (err) {
                toast.error(err.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            v$.value.$reset()
        }
    }
}

const fetchContacts = async () => {
    contactStore.allContacts.loading = true
    const [res, err] = await contactStore.fetchContacts()
    contactStore.allContacts.loading = false
    if (res) {
        contactStore.allContacts.errorMessage = ''
        contactStore.allContacts.contacts = res.data
    }
    if (err) {
        contactStore.allContacts.errorMessage = err.response.data.message
    }
}

onBeforeMount(async () => {
    if (!contactStore.allContacts.contacts.length) {
        fetchContacts()
    }
})
</script>
