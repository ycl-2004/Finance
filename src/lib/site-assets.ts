const basePath = process.env.GITHUB_PAGES === "true" ? "/Finance" : "";

export function siteAssetPath(path: `/${string}`) {
  return `${basePath}${path}`;
}
