const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

export async function apiJson(url, options = {}) {
  const token = localStorage.getItem("authToken");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Add Authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      data?.error === "validation error"
        ? "Validation error"
        : data?.error || data?.message || "Erreur";
    const err = new Error(msg);
    err.status = res.status;
    err.details = data?.details;
    throw err;
  }
  return data;
}

export default API_URL;
