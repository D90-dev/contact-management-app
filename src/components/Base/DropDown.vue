<template>
    <div :class="`${isOpen ? 'open' : ''}`">
        <button @click="() => (isOpen = !isOpen)">
            <img
                src="/icons/dots-three-circle-vertical-thin-svgrepo-com.svg"
                alt="icon"
                class="w-14 rounded-full absolute top-0 right-0 p-2 cursor-pointer"
            />
        </button>
        <transition name="fade">
            <div v-if="isOpen" class="bg-white rounded-lg absolute top-11 right-4 z-10 w-1/3">
                <ul class="flex-col flex gap-2" v-for="(option, index) in data" :key="index">
                    <li
                        @click.stop="handleChange(option?.option)"
                        class="text-background-secondary flex w-full p-2 hover:bg-slate-400 items-center justify-between cursor-pointertext-base"
                    >
                        {{ option?.option }}

                        <img :src="option?.icon" alt="icon" class="w-4 h-4" />
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IOptions } from '@/interfaces/IContacts'

const isOpen = ref<boolean>(false)

interface IProps {
    data: IOptions[]
}

const emit = defineEmits(['handleChange'])
defineProps<IProps>()

const handleChange = (option: string) => {
    emit('handleChange', option)
    isOpen.value = false
}
</script>

<style scoped></style>
