const ADMIN_AUTH_KEY = 'adminAuth';
const ADMIN_AUTH_TIME_KEY = 'adminAuthTime';
const ADMIN_SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

function hasWindow() {
  return typeof window !== 'undefined';
}

export function setAdminAuthenticated() {
  if (!hasWindow()) {
    return;
  }

  window.sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
  window.sessionStorage.setItem(ADMIN_AUTH_TIME_KEY, Date.now().toString());
}

export function clearAdminAuthenticated() {
  if (!hasWindow()) {
    return;
  }

  window.sessionStorage.removeItem(ADMIN_AUTH_KEY);
  window.sessionStorage.removeItem(ADMIN_AUTH_TIME_KEY);
}

export function isAdminAuthenticated() {
  if (!hasWindow()) {
    return false;
  }

  const authValue = window.sessionStorage.getItem(ADMIN_AUTH_KEY);
  const authTime = Number(window.sessionStorage.getItem(ADMIN_AUTH_TIME_KEY));

  if (authValue !== 'true' || !Number.isFinite(authTime)) {
    clearAdminAuthenticated();
    return false;
  }

  if (Date.now() - authTime > ADMIN_SESSION_DURATION_MS) {
    clearAdminAuthenticated();
    return false;
  }

  return true;
}
