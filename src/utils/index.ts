import prettyMs from "pretty-ms";

export function formatDate(val: string): string {
  return prettyMs(Date.now() - new Date(val).getTime(), { compact: true });
}

export function formatId(id: string): string {
  console.log("formatId: ", id);
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
