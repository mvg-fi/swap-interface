<script lang="ts">
	import SuccessIcon from '$lib/images/success.svg';

	export let message: string;
</script>

<div class="inline-block">
	<img loading="lazy" src={SuccessIcon} alt="success-icon" />
</div>

<div class="inline-block font-semibold break-words leading-10">{message.length <= 100 ? message : `${message.substring(0, 200)}...`}</div>