<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { address } from "$lib/stores/user";
  import { providerLogo } from "$lib/stores/provider";
  import ChevronUp from "$lib/images/chevron-up.svg";
  import ChevronDown from "$lib/images/chevron-down.svg";
  import CircleWarning from "$lib/images/circle-warning.svg";
  import { receiverAddr,receiverMemo } from "$lib/stores/bridge/bridge";

  let haveMemo = false;
  let validated = true;
  let autofill = true;
</script>

<div class="form-control text-base-content">
  <div class="input-group">
    <input
      bind:value={$receiverAddr}
      class={clsx(
        "input bg-base-200 w-full outline-none input-md px-5 transition-none",
        !haveMemo && "rounded-l-3xl",
        haveMemo && "rounded-tl-3xl rounded-b-none"
      )}
      placeholder={$_("bridge.enter_recipient_address")}
    />

    <!-- Validation -->
    {#if !validated}
      <button class="btn btn-disabled bg-base-200 border-none px-1">
        <div class="tooltip" data-tip={$_("bridge.memo")}>
          <img
            src={CircleWarning}
            alt=""
            class="w-4 fill-error [[data-theme=dark]_&]:invert"
          />
        </div>
      </button>
    {/if}

    <!-- Autofill -->
    {#if autofill}
      <button class="btn bg-base-200 border-none px-1" on:click={()=>receiverAddr.set($address)}>
        <div class="tooltip" data-tip={$_("bridge.autofill")}>
          <img
            src={$providerLogo}
            alt=""
            class="w-4 fill-error"
          />
        </div>
      </button>
    {/if}

    <!-- Drop down -->
    <button
      class={clsx(
        "btn bg-base-200 border-none btn-md pl-2",
        !haveMemo && "rounded-r-3xl",
        haveMemo && "rounded-tr-3xl rounded-b-none"
      )}
      on:click={() => (haveMemo = !haveMemo)}
    >
      <div class="tooltip" data-tip={$_("bridge.memo")}>
        <img
          alt=""
          src={haveMemo ? ChevronUp : ChevronDown}          
          class="w-5 [[data-theme=dark]_&]:invert"
        />
      </div>
    </button>
  </div>

  {#if haveMemo}
    <div>
      <input
        bind:value={$receiverMemo}
        class="input bg-base-200 w-full outline-none input-md rounded-b-3xl rounded-t-none px-5 transition-none"
        placeholder={$_("bridge.enter_memo")}
      />
    </div>
  {/if}
</div>
