<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { address } from "$lib/stores/user";
  import { providerLogo } from "$lib/stores/provider";
  import Close from "$lib/images/close.svg";
  import ChevronUp from "$lib/images/chevron-up.svg";
  import ChevronDown from "$lib/images/chevron-down.svg";
  import CircleWarning from "$lib/images/circle-warning.svg";
  import {
    receiverAddr,
    receiverMemo,
    selectedToAsset,
  } from "$lib/stores/bridge/bridge";
  import { connected } from "$lib/stores/connect";
  import { validate } from "multicoin-address-validator";

  let haveMemo = false;
  let validated = true;
  let autofill = true;

  // TODO: validate address
  const validation = () => {
    console.log('validated:',$receiverAddr)
    if (!$connected) return
    if ($receiverAddr === null || $receiverAddr === '') return
    if ($selectedToAsset === null || $selectedToAsset === undefined) return
    if (validate($receiverAddr, $selectedToAsset.symbol)) {
      validated = true
    } else{
      validated = false;
    }
    console.log('validated:',validated)
  }
  $: showAutoFill = $connected && autofill && ($receiverAddr == null || $receiverAddr == "")
</script>

<div class="form-control text-base-content">
  <div class="input-group">
    <input
      bind:value={$receiverAddr}
      class={clsx(
        "input bg-base-200 w-full outline-none input-md pl-5 transition-none focus:outline-none",
        showAutoFill ? "!rounded-l-3xl" : "!rounded-3xl"
      )}
      on:change={()=>validation()}
      placeholder={$_("bridge.enter_recipient_address")}
    />

    <!-- Validation -->
    {#if !validated}
      <button class="btn bg-base-200 border-none px-1 hover:bg-base-200">
        <div class="tooltip" data-tip={$_("bridge.invalid_address")}>
          <img
            src={CircleWarning}
            alt=""
            class="w-4 fill-error [[data-theme=dark]_&]:invert"
          />
        </div>
      </button>
    {/if}

    <!-- Autofill -->
    {#if showAutoFill}
      <button
        class="btn bg-base-200 border-none px-1 hover:bg-base-200 !rounded-r-3xl pr-5"
        on:click={() => receiverAddr.set($address)}
      >
        <div class="tooltip" data-tip={$_("bridge.autofill")}>
          <img src={$providerLogo} alt="" class="w-4 fill-error" />
        </div>
      </button>
    {:else if $connected && $receiverAddr != ""}
      <button
        class="btn bg-base-200 border-none px-1 hover:bg-base-200 !rounded-r-3xl pr-5"
        on:click={() => receiverAddr.set('')}
      >
        <div class="tooltip" data-tip={$_("bridge.delete")}>
          <img
            src={Close}
            alt=""
            class="w-4 fill-error [[data-theme=dark]_&]:invert"
          />
        </div>
      </button>
    {/if}

    <!-- Drop down -->
    <!-- <button
      class={clsx(
        "btn bg-base-200 border-none btn-md pl-2 hover:bg-base-200",
        !haveMemo && "!rounded-r-3xl",
        haveMemo && "!rounded-tr-3xl !rounded-b-none"
      )}
      on:click={() => (haveMemo = !haveMemo)}
    >
      <div class="tooltip" data-tip={$_("bridge.memo")}>
        <img
          alt=""
          src={haveMemo ? ChevronUp : ChevronDown}
          class="w-4 [[data-theme=dark]_&]:invert"
        />
      </div>
    </button> -->
  </div>

  {#if haveMemo}
    <div>
      <input
        bind:value={$receiverMemo}
        class="input bg-base-200 w-full outline-none input-md rounded-b-3xl rounded-t-none px-5 transition-none focus:outline-none"
        placeholder={$_("bridge.enter_memo")}
      />
    </div>
  {/if}
</div>

<style>
  .tooltip {
    z-index: 1;
  }
</style>
