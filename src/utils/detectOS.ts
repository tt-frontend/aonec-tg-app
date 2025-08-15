export enum OS {
  Android = "Android",
  iOS = "iOS",
  Windows = "Windows",
  MacOS = "MacOS",
  Linux = "Linux",
  Unknown = "Unknown",
}

export const detectOS = (): OS => {
  const ua: string = navigator.userAgent || navigator.vendor || "";

  if (/android/i.test(ua)) {
    return OS.Android;
  }

  if (
    /iPad|iPhone|iPod/.test(ua) &&
    !(
      typeof (window as unknown as { MSStream?: unknown }).MSStream !==
      "undefined"
    )
  ) {
    return OS.iOS;
  }

  if (/Win(dows )?NT/i.test(ua)) {
    return OS.Windows;
  }

  if (/Macintosh|Mac OS X/i.test(ua)) {
    return OS.MacOS;
  }

  if (/Linux/i.test(ua)) {
    return OS.Linux;
  }

  return OS.Unknown;
};
