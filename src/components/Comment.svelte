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

	$: reply = false;

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
	<div class="bg-white p-5 flex gap-4 items-start mt-5 mb-2 rounded-md">
		<Switch score={comment.score} on:update-score={updateScore} />

		<div>
			<div class="flex justify-between items-center mb-3">
				<div class="flex items-center gap-3 text-sm text-blue-100 ">
					<img
						src={comment.user.image.png}
						alt={comment.user.username}
						class="w-7"
					/>
					<h5 class="font-bold">
						{comment.user.username}
					</h5>
					<span>{comment.createdAt}</span>
				</div>
				<Button
					variant="icon"
					icon="reply"
					on:on-click={() => (reply = !reply)}
				/>
			</div>
			<p class="text-sm text-blue-100 leading-[21px]">{comment.content}</p>
		</div>
	</div>

	<Response {reply} />
</div>
