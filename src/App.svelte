<script lang="ts">
	import Comment from './components/Comment.svelte';
	import data from './data/data.json';

	$: comments = data.comments;

	const updateScore = ({
		detail,
	}: {
		detail: { id: number; score: number };
	}) => {
		comments = comments.map(comment => {
			if (comment.id === detail.id) {
				comment.score = detail.score;
			}
			return comment;
		});
	};
</script>

<main class="font-rubik h-full w-full max-w-2xl mx-auto p-3">
	{#each comments as comment}
		<Comment {comment} on:update-score={updateScore} />
	{/each}
</main>

<style>
</style>
