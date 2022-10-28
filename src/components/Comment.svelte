<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Response from './Response.svelte';
	import Button from './UI/Button.svelte';
	import Switch from './UI/Switch.svelte';

	export let comment: {
		id: number;
		content: string;
		createdAt: string;
		score: number;
		user: {
			image: {
				png: string;
				webp: string;
			};
			username: string;
		};
		replies: any[];
	};

	const dispatch = createEventDispatcher();
	const updateScore = ({ detail }: { detail: 'increment' | 'decrement' }) => {
		switch (detail) {
			case 'increment':
				dispatch('update-score', { id: comment.id, score: comment.score + 1 });
				break;

			case 'decrement':
				dispatch('update-score', { id: comment.id, score: comment.score - 1 });
				break;

			default:
				break;
		}
	};
</script>

<div>
	<div class="bg-white p-5 flex gap-3 items-start my-5">
		<Switch score={comment.score} on:update-score={updateScore} />
		<div>
			<div class="flex justify-between items-center mb-2">
				<div />
				<Button variant="icon" icon="reply" />
			</div>
			<p class="text-sm text-blue-100">{comment.content}</p>
		</div>
	</div>

	<!-- <Response /> -->
</div>
