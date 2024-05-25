<template>
    <div class="flex flex-col gap-2">
        <div v-if="label" class="">{{ label }}</div>
        <input
            :value="modelValue"
            :placeholder="placeholder"
            :type="type"
            :name="name"
            class="border border-gray-300 rounded-md w-full p-2"
            @input="handleChange"
        />
    </div>
</template>

<script setup lang="ts">
interface IProps {
    label?: string
    placeholder?: string
    type?: string
    name?: string
    modelValue: string
}

defineProps<IProps>()
const emit = defineEmits(['update:modelValue'])

const handleChange = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>
