export function checkUrl(str: string, url: string) {
  return new RegExp(str, "gi").test(url);
}

