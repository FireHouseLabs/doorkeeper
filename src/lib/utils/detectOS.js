export function isiOS() {
    // @ts-ignore
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }