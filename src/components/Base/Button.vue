<template>
    <button
        :disabled="disabled"
        class="bg-background-secondary text-white flex items-center gap-3 py-3 px-5 w-full justify-center rounded-md disabled:bg-slate-500"
        @click="handleChange"
    >
        {{ label }}
    </button>
</template>

<script setup lang="ts">
interface IProps {
    label: string
    disabled?: boolean
}

defineProps<IProps>()
const emit = defineEmits(['click'])

const handleChange = () => {
    emit('click')
}
</script>

<style scoped></style>
