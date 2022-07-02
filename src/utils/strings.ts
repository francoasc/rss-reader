// To make sure we are getting a correct url for the Image
export const addHttpToUrl = (url: string) => {
  let includesTwoSlashes = [];

  if (url.includes("http://")) return url;

  for (let i = 0; i < url.length; i++) {
    if ([0, 1].includes(includesTwoSlashes.length)) {
      if (url[i] === "/") includesTwoSlashes.push("/");
    }

    if (includesTwoSlashes.length === 1) {
      if (url[i] !== "/") includesTwoSlashes.pop();
    }

    if (includesTwoSlashes.length === 2) return `http://${url.split("//")[1]}`;
  }

  return `http://${url}`;
};
