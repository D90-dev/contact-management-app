<template>
    <teleport to="body">
        <transition name="fade">
            <div
                class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-2"
                @click="handleClose"
            >
                <div class="bg-white relative rounded-lg p-6 md:w-1/3 w-full" @click.stop>
                    <div class="flex items-center justify-between">
                        <div v-if="$slots.title">
                            <slot name="title"></slot>
                        </div>
                        <button @click="handleClose" class="">
                            <img
                                src="/icons/close-circle-svgrepo-com.svg"
                                alt="close"
                                class="h-6 w-6"
                            />
                        </button>
                    </div>
                    <div class="mt-4">
                        <slot name="content"></slot>
                    </div>
                    <div class="mt-4">
                        <Button
                            label="Submit"
                            @click="handleSubmit"
                            :isLoading="isLoading"
                            :disabled="isLoading"
                        />
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
import Button from '@/components/Base/Button.vue'

interface IProps {
    isLoading: boolean
}

defineProps<IProps>()
const emit = defineEmits(['close', 'submit'])
const handleClose = () => {
    emit('close')
}

const handleSubmit = () => {
    emit('submit')
}
</script>
