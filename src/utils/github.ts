export type ReleaseImage = {
  name: string;
  url: string;
  size: number;
  contentType?: string;
};

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp"];

export async function fetchLatestReleaseImages(owner: string, repo: string, token?: string): Promise<ReleaseImage[]> {
  const headers: Record<string,string> = {
    Accept: "application/vnd.github+json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, { headers });
  if (!res.ok) {
    // No release or rate limit; return empty so UI can handle
    return [];
  }
  const data = await res.json();
  const assets = Array.isArray(data.assets) ? data.assets : [];

  const images: ReleaseImage[] = assets
    .filter((a: any) => typeof a.browser_download_url === 'string')
    .filter((a: any) => IMAGE_EXTENSIONS.some(ext => a.name?.toLowerCase().endsWith(ext)))
    .map((a: any) => ({
      name: a.name,
      url: a.browser_download_url,
      size: a.size ?? 0,
      contentType: a.content_type,
    }));

  return images;
}
