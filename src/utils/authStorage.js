const AUTH_KEY = "sfib-auth";

export function getAuthState() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return { isLoggedIn: false, user: null };
    const data = JSON.parse(raw);
    if (data?.isLoggedIn && data?.user?.email) {
      return { isLoggedIn: true, user: data.user };
    }
    return { isLoggedIn: false, user: null };
  } catch {
    return { isLoggedIn: false, user: null };
  }
}

export function setAuthState(payload) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
  window.dispatchEvent(new Event("sfib-auth-change"));
}

export function clearAuthState() {
  localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event("sfib-auth-change"));
}
