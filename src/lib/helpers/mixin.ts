export const isIOS = () => {
  const ua = window?.navigator?.userAgent;
  const check = function (pattern: RegExp): boolean {
    return (pattern).test(ua);
  }
  return check(/\(i[^;]+;( U;)? CPU.+Mac OS X/i)
}

export const isMixin = () => {
  const ios = isIOS()
  return !!(ios
    ? window?.webkit?.messageHandlers?.MixinContext
    : window?.MixinContext && typeof window?.MixinContext?.getContext === 'function');
}

export const getMixinContext = () => {
  const ios = isIOS()
  return ios 
    ? window?.webkit?.messageHandlers?.MixinContext
    : window?.MixinContext;
}