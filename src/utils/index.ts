export function formatDate(val: string): string {
  return new Date(val).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatId(id: string): string {
  if (id[id.length - 1] === "/") {
    return id.slice(0, -1);
  } else {
    return id;
  }
}

export function extractIdFromUrl(url?: string): string {
  if (url) {
    const formattedUrl = formatId(url);
    const vals = formattedUrl.split("/");
    return vals[vals.length - 1];
  }
  return "";
}
