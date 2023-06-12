<script setup lang="ts">
import { Transition } from 'vue'
const props = defineProps<{ d1: string; d2: string }>()
</script>

<template>
	<div class="relative w-[289px] h-[217px]">
		<Transition name="d1">
			<div
				:key="props.d1"
				class="absolute h-full flex place-content-center will-change-[transform,opacity]"
			>
				{{ props.d1 }}
			</div>
		</Transition>

		<Transition name="d2">
			<div
				:key="props.d2"
				class="absolute right-0 h-full flex place-content-center will-change-[transform,opacity]"
			>
				{{ props.d2 }}
			</div>
		</Transition>
	</div>
</template>

<style scoped>
.d1-enter-active,
.d2-enter-active,
.d1-leave-active,
.d2-leave-active {
	transform: translate3d(0%, 0, 0);
	transition: all 0.25s ease-in-out;
}

.d1-enter-from {
	opacity: 0;
	transform: translate3d(-50%, 0, 0);
}

.d2-enter-from {
	opacity: 0;
	transform: translate3d(50%, 0, 0);
}
.d1-enter-to,
.d2-enter-to {
	opacity: 1;
}

.d1-leave-to,
.d2-leave-to {
	opacity: 0;
}
</style>
