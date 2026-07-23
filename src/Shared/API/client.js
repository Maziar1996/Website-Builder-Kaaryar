const API_BASE = "https://kwb-backend.onrender.com";

function buildUrl(path, params) {
  const url = `${API_BASE}${path}`;
  if (!params) return url;

  const query = new URLSearchParams(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null,
    ),
  ).toString();

  return query ? `${url}?${query}` : url;
}

export async function request(path, options = {}) {
  const { method = "GET", data, params, headers, ...rest } = options;

  const response = await fetch(buildUrl(path, params), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: data !== undefined ? JSON.stringify(data) : undefined,
    ...rest,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `درخواست با خطا مواجه شد (${response.status})`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const apiClient = { request };
