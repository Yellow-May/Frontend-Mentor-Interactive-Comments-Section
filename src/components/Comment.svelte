<script lang="ts">
	import Response from './Response.svelte';
	import Button from './UI/Button.svelte';

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
</script>

<div>
	<div class="bg-white p-5 flex gap-3 items-start my-5">
		<div class="w-3 h-7 bg-blue-50" />
		<div>
			<div class="flex justify-between items-center mb-2">
				<div />
				<Button variant="icon" icon="reply" />
			</div>
			<p class="text-sm text-blue-100">{comment.content}</p>
		</div>
	</div>

	<Response />
</div>
