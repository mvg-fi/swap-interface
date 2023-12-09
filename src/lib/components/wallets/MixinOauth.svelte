<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n"
  import Close from "$lib/images/close.svg";
  import mx from "$lib/images/logo/mixin.svg";
  import authorize from "$lib/helpers/web3/mixin";
  import QrCode from "$lib/components/common/qrCode.svelte";
  // import CloseIcon from "@heroicons/vue/24/outline/XCircleIcon";
  import {
    SWAP_BOT_ID,
    OAUTH_SCOPE,
    MIXIN_MESSENGER_INSTALL,
  } from "$lib/helpers/constants";
  import { setWalletDialog } from "$lib/stores/selectWallet";
  import { onDestroy, onMount } from "svelte";

  let qrLoaded = false;
  let qrURL = "";

  const auth = () => {
    authorize(
      { clientId: SWAP_BOT_ID, scope: OAUTH_SCOPE, pkce: true },
      {
        onShowUrl: (url) => {
          qrLoaded = true;
          qrURL = url;
          console.log("onShowURL:", url);
        },
        onError: (error) => {
          console.error(error);
          return;
        },
        onSuccess: async (data) => {
          return;
        },
      },
    );
  };
  onMount(() => {
    auth();
  });
  onDestroy(() => {
    qrLoaded = false;
    qrURL = "";
  });
</script>

<div
  class="{
      clsx(
        'align-self-center overflow-y-auto bg-background',
        'mixin-oauth-card rounded-xl'
      )
  }"
>
  <!-- Title -->
  <div class="d-flex mt-6 ml-6 justify-center align-center">
    <span class="oauth-title flex-grow-1"> {$_("scan_to_connect")} </span>
    <button
      class="mr-6 d-flex align-center justify-center"
      style="width: 16px; height: 16px"
      on:click={() => setWalletDialog(false)}
    >
      <!-- <v-icon>
          <close-icon />
        </v-icon> -->
    </button>
  </div>

  <!-- QRcode -->
  <div class="d-flex justify-center">
    {#if qrLoaded}
      <div class="ma-8">
        <div style="position: relative">
          <image
            eager
            :src="mx"
            style="
              width: 48px;
              height: 48px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              border-radius: 32px;
            "
          />
          <QrCode value={qrURL} class="" size={232} />
        </div>
      </div>
    {:else}
      <div class="ma-8">
        <div
          style="height: 232px; width: 232px"
          class="d-flex justify-center align-center"
        >
          <v-progress-circular indeterminate color="primary" />
        </div>
      </div>
    {/if}
  </div>

  <!-- Helper text -->
  <div class="d-flex flex-column text-center justify-center align-center">
    <!-- Install -->
    <span class="helper-text">
      {$_("don't_have_mixin_messenger")}
    </span>
    <a href={MIXIN_MESSENGER_INSTALL} target="_blank">
      <button
        class="rounded-pill mt-3"
        style="background-color: var(--palette-black-10); width: 170px"
      >
        <span class="helper-text">{$_("install")}</span>
      </button>
    </a>
  </div>
</div>

<style lang="scss" scoped>
  .oauth-title {
    font-size: 18px;
    line-height: 32px;
    font-family: Satoshi-Bold;
  }
  // .mixin-oauth-card {
  //   width: 305px;
  //   height: 464px;
  // }
  // .mixin-oauth-card-mobile {
  //   width: 100vw;
  // }
  .helper-text {
    font-size: 12px;
    font-family: Satoshi-Bold;
  }
</style>
