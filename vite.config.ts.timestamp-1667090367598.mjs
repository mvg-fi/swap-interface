// vite.config.ts
import { sveltekit } from "file:///home/whoami/dev/curve/interface/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import nodePolyfills from "file:///home/whoami/dev/curve/interface/node_modules/rollup-plugin-polyfill-node/dist/index.js";
import { NodeGlobalsPolyfillPlugin } from "file:///home/whoami/dev/curve/interface/node_modules/@esbuild-plugins/node-globals-polyfill/dist/index.js";
import { NodeModulesPolyfillPlugin } from "file:///home/whoami/dev/curve/interface/node_modules/@esbuild-plugins/node-modules-polyfill/dist/index.js";
import inject from "file:///home/whoami/dev/curve/interface/node_modules/@rollup/plugin-inject/dist/es/index.js";
import svg from "file:///home/whoami/dev/curve/interface/node_modules/@poppanator/sveltekit-svg/dist/index.js";
var production = process.env.NODE_ENV === "production";
var config = {
  define: {
    __version__: JSON.stringify(process.env.npm_package_version)
  },
  resolve: {
    alias: {
      path: "path-browserify",
      util: "rollup-plugin-node-polyfills/polyfills/util"
    }
  },
  plugins: [
    sveltekit(),
    !production && nodePolyfills({
      include: ["node_modules/**/*.js", new RegExp("node_modules/.vite/.*js")]
    }),
    svg({
      type: "url",
      svgoOptions: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: { overrides: { removeViewBox: false, removeUselessStrokeAndFill: false } }
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis"
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        nodePolyfills(),
        inject({ Buffer: ["buffer", "Buffer"] })
      ]
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS93aG9hbWkvZGV2L2N1cnZlL2ludGVyZmFjZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvd2hvYW1pL2Rldi9jdXJ2ZS9pbnRlcmZhY2Uvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvd2hvYW1pL2Rldi9jdXJ2ZS9pbnRlcmZhY2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tICdAc3ZlbHRlanMva2l0L3ZpdGUnO1xuaW1wb3J0IG5vZGVQb2x5ZmlsbHMgZnJvbSAncm9sbHVwLXBsdWdpbi1wb2x5ZmlsbC1ub2RlJztcbmltcG9ydCB7IE5vZGVHbG9iYWxzUG9seWZpbGxQbHVnaW4gfSBmcm9tICdAZXNidWlsZC1wbHVnaW5zL25vZGUtZ2xvYmFscy1wb2x5ZmlsbCc7XG5pbXBvcnQgeyBOb2RlTW9kdWxlc1BvbHlmaWxsUGx1Z2luIH0gZnJvbSAnQGVzYnVpbGQtcGx1Z2lucy9ub2RlLW1vZHVsZXMtcG9seWZpbGwnO1xuaW1wb3J0IGluamVjdCBmcm9tICdAcm9sbHVwL3BsdWdpbi1pbmplY3QnO1xuXG5pbXBvcnQgc3ZnIGZyb20gJ0Bwb3BwYW5hdG9yL3N2ZWx0ZWtpdC1zdmcnO1xuXG5jb25zdCBwcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJ3ZpdGUnKS5Vc2VyQ29uZmlnfSAqL1xuY29uc3QgY29uZmlnID0ge1xuXHRkZWZpbmU6IHtcblx0XHRfX3ZlcnNpb25fXzogSlNPTi5zdHJpbmdpZnkocHJvY2Vzcy5lbnYubnBtX3BhY2thZ2VfdmVyc2lvbilcblx0fSxcblx0cmVzb2x2ZToge1xuXHRcdGFsaWFzOiB7XG5cdFx0XHRwYXRoOiAncGF0aC1icm93c2VyaWZ5Jyxcblx0XHRcdHV0aWw6ICdyb2xsdXAtcGx1Z2luLW5vZGUtcG9seWZpbGxzL3BvbHlmaWxscy91dGlsJ1xuXHRcdH1cblx0fSxcblx0cGx1Z2luczogW1xuXHRcdHN2ZWx0ZWtpdCgpLFxuXHRcdC8vIFx1MjE5MyBOZWVkZWQgZm9yIGRldmVsb3BtZW50IG1vZGVcblx0XHQhcHJvZHVjdGlvbiAmJlxuXHRcdFx0bm9kZVBvbHlmaWxscyh7XG5cdFx0XHRcdGluY2x1ZGU6IFsnbm9kZV9tb2R1bGVzLyoqLyouanMnLCBuZXcgUmVnRXhwKCdub2RlX21vZHVsZXMvLnZpdGUvLipqcycpXVxuXHRcdFx0fSksXG5cdFx0c3ZnKHtcblx0XHRcdHR5cGU6ICd1cmwnLFxuXHRcdFx0c3Znb09wdGlvbnM6IHtcblx0XHRcdFx0bXVsdGlwYXNzOiB0cnVlLFxuXHRcdFx0XHRwbHVnaW5zOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZTogJ3ByZXNldC1kZWZhdWx0Jyxcblx0XHRcdFx0XHRcdC8vIGJ5IGRlZmF1bHQgc3ZnbyByZW1vdmVzIHRoZSB2aWV3Qm94IHdoaWNoIHByZXZlbnRzIHN2ZyBpY29ucyBmcm9tIHNjYWxpbmdcblx0XHRcdFx0XHRcdC8vIG5vdCBhIGdvb2QgaWRlYSEgaHR0cHM6Ly9naXRodWIuY29tL3N2Zy9zdmdvL3B1bGwvMTQ2MVxuXHRcdFx0XHRcdFx0cGFyYW1zOiB7IG92ZXJyaWRlczogeyByZW1vdmVWaWV3Qm94OiBmYWxzZSwgcmVtb3ZlVXNlbGVzc1N0cm9rZUFuZEZpbGw6IGZhbHNlIH0gfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdH0pXG5cdF0sXG5cdG9wdGltaXplRGVwczoge1xuXHRcdGVzYnVpbGRPcHRpb25zOiB7XG5cdFx0XHQvLyBOb2RlLmpzIGdsb2JhbCB0byBicm93c2VyIGdsb2JhbFRoaXNcblx0XHRcdGRlZmluZToge1xuXHRcdFx0XHRnbG9iYWw6ICdnbG9iYWxUaGlzJ1xuXHRcdFx0fSxcblx0XHRcdC8vIEVuYWJsZSBlc2J1aWxkIHBvbHlmaWxsIHBsdWdpbnNcblx0XHRcdHBsdWdpbnM6IFtcblx0XHRcdFx0Tm9kZUdsb2JhbHNQb2x5ZmlsbFBsdWdpbih7XG5cdFx0XHRcdFx0YnVmZmVyOiB0cnVlLFxuXHRcdFx0XHRcdHByb2Nlc3M6IHRydWVcblx0XHRcdFx0fSksXG5cdFx0XHRcdE5vZGVNb2R1bGVzUG9seWZpbGxQbHVnaW4oKVxuXHRcdFx0XVxuXHRcdH1cblx0fSxcblxuXHRidWlsZDoge1xuXHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdHBsdWdpbnM6IFtcblx0XHRcdFx0Ly8gXHUyMTkzIE5lZWRlZCBmb3IgYnVpbGRcblx0XHRcdFx0bm9kZVBvbHlmaWxscygpLFxuXHRcdFx0XHRpbmplY3QoeyBCdWZmZXI6IFsnYnVmZmVyJywgJ0J1ZmZlciddIH0pXG5cdFx0XHRdXG5cdFx0fSxcblx0XHQvLyBcdTIxOTMgTmVlZGVkIGZvciBidWlsZCBpZiB1c2luZyBXYWxsZXRDb25uZWN0IGFuZCBvdGhlciBwcm92aWRlcnNcblx0XHRjb21tb25qc09wdGlvbnM6IHtcblx0XHRcdHRyYW5zZm9ybU1peGVkRXNNb2R1bGVzOiB0cnVlXG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFrUixTQUFTLGlCQUFpQjtBQUM1UyxPQUFPLG1CQUFtQjtBQUMxQixTQUFTLGlDQUFpQztBQUMxQyxTQUFTLGlDQUFpQztBQUMxQyxPQUFPLFlBQVk7QUFFbkIsT0FBTyxTQUFTO0FBRWhCLElBQU0sYUFBYSxRQUFRLElBQUksYUFBYTtBQUc1QyxJQUFNLFNBQVM7QUFBQSxFQUNkLFFBQVE7QUFBQSxJQUNQLGFBQWEsS0FBSyxVQUFVLFFBQVEsSUFBSSxtQkFBbUI7QUFBQSxFQUM1RDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1A7QUFBQSxFQUNEO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUixVQUFVO0FBQUEsSUFFVixDQUFDLGNBQ0EsY0FBYztBQUFBLE1BQ2IsU0FBUyxDQUFDLHdCQUF3QixJQUFJLE9BQU8seUJBQXlCLENBQUM7QUFBQSxJQUN4RSxDQUFDO0FBQUEsSUFDRixJQUFJO0FBQUEsTUFDSCxNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsUUFDWixXQUFXO0FBQUEsUUFDWCxTQUFTO0FBQUEsVUFDUjtBQUFBLFlBQ0MsTUFBTTtBQUFBLFlBR04sUUFBUSxFQUFFLFdBQVcsRUFBRSxlQUFlLE9BQU8sNEJBQTRCLE1BQU0sRUFBRTtBQUFBLFVBQ2xGO0FBQUEsUUFDRDtBQUFBLE1BQ0Q7QUFBQSxJQUNELENBQUM7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDYixnQkFBZ0I7QUFBQSxNQUVmLFFBQVE7QUFBQSxRQUNQLFFBQVE7QUFBQSxNQUNUO0FBQUEsTUFFQSxTQUFTO0FBQUEsUUFDUiwwQkFBMEI7QUFBQSxVQUN6QixRQUFRO0FBQUEsVUFDUixTQUFTO0FBQUEsUUFDVixDQUFDO0FBQUEsUUFDRCwwQkFBMEI7QUFBQSxNQUMzQjtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQUEsRUFFQSxPQUFPO0FBQUEsSUFDTixlQUFlO0FBQUEsTUFDZCxTQUFTO0FBQUEsUUFFUixjQUFjO0FBQUEsUUFDZCxPQUFPLEVBQUUsUUFBUSxDQUFDLFVBQVUsUUFBUSxFQUFFLENBQUM7QUFBQSxNQUN4QztBQUFBLElBQ0Q7QUFBQSxJQUVBLGlCQUFpQjtBQUFBLE1BQ2hCLHlCQUF5QjtBQUFBLElBQzFCO0FBQUEsRUFDRDtBQUNEO0FBRUEsSUFBTyxzQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K
