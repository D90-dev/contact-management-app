<template>
    <div class="flex-col flex justify-center items-center gap-4">
        <img src="/download.jpg" alt="icon" class="w-25 h-20 mx-auto rounded-full" />
        <div class="flex-col flex justify-center items-center gap-2">
            <h1 class="text-xl text-background-secondary">Name: {{ data.name }}</h1>
            <p class="text-background-secondary">Email: {{ data.email }}</p>
            <p class="text-background-secondary">Phone: {{ data.phone }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IContactCard } from '@/interfaces/IContact'

interface IProps {
    data: IContactCard
}

defineProps<IProps>()
</script>
