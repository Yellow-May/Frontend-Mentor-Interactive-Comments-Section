<script lang="ts">
	import Button from './UI/Button.svelte';
	import Input from './UI/Input.svelte';
	import data from '../data/data.json';
	const user = data.currentUser;

	let comment = '';

	const handleInput = (e: CustomEvent<any>) => (comment = e.detail);
	const handleSubmit = () => {
		console.log(comment);
	};

	export let type: 'New' | 'Reply' = 'Reply';
	export let reply: boolean = true;
	export let replyingTo: string = '';
</script>

<form
	on:submit|preventDefault={handleSubmit}
	class={`bg-white rounded-md p-5 flex items-start gap-3 ${
		reply ? '' : 'hidden'
	}`}
>
	<img src={user.image.png} alt={user.username} class="w-10" />
	<Input
		name="new-comment"
		class="flex-grow"
		on:comment-input={handleInput}
		{replyingTo}
	/>
	<Button type="submit">{type === 'Reply' ? type : 'Send'}</Button>
</form>
