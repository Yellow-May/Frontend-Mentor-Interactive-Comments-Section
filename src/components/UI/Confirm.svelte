<script lang="ts">
	import Button from './Button.svelte';

	export let title = 'Delete comment';
	export let text = `Are you sure you want to delete this comment? This will remove the comment and can't be undone`;
	export let cancelText = 'No, Cancel';
	export let okText = 'Yes, Delete';
	export let onCancel: () => void;
	export let onOk: () => void;
</script>

<div
	class="fixed top-0 left-0 z-10 w-full h-full flex items-center justify-center px-[3%]"
>
	<div
		class="bg-blue-300 opacity-20 w-full h-full absolute"
		on:click={onCancel}
		on:keydown={onCancel}
	/>

	<div
		class="z-10 w-full max-w-sm bg-white p-5 md:p-7 rounded-md text-blue-300"
	>
		<h1 class="font-bold mb-3 text-lg">{title}</h1>
		<p class="text-sm leading-[21px] mb-5">{text}</p>
		<div class="grid grid-cols-2 gap-4">
			<Button variant="secondary" on:on-click={onCancel}>{cancelText}</Button>
			<Button variant="danger" on:on-click={onOk}>{okText}</Button>
		</div>
	</div>
</div>
