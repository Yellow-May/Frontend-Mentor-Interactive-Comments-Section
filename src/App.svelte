<script lang="ts">
	import Comment from './components/Comment.svelte';
	import data from './data/data.json';
</script>

<main class="font-rubik h-full w-full max-w-2xl mx-auto p-3">
	{#each data.comments as comment}
		<Comment {comment} />
	{/each}
</main>

<style>
</style>
