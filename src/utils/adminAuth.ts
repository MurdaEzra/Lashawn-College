const ADMIN_AUTH_KEY = 'adminAuth';
const ADMIN_AUTH_TIME_KEY = 'adminAuthTime';
const ADMIN_ID_KEY = 'adminId';
const ADMIN_NAME_KEY = 'adminName';
const ADMIN_EMAIL_KEY = 'adminEmail';
const ADMIN_ROLE_KEY = 'adminRole';
const ADMIN_SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

function hasWindow() {
  return typeof window !== 'undefined';
}

export function setAdminAuthenticated(admin?: {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  role?: string | null;
}) {
  if (!hasWindow()) {
    return;
  }

  window.sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
  window.sessionStorage.setItem(ADMIN_AUTH_TIME_KEY, Date.now().toString());
  window.sessionStorage.setItem(ADMIN_ID_KEY, admin?.id?.trim() || '');
  window.sessionStorage.setItem(ADMIN_NAME_KEY, admin?.name?.trim() || '');
  window.sessionStorage.setItem(ADMIN_EMAIL_KEY, admin?.email?.trim() || '');
  window.sessionStorage.setItem(ADMIN_ROLE_KEY, admin?.role?.trim() || 'admin');
}

export function clearAdminAuthenticated() {
  if (!hasWindow()) {
    return;
  }

  window.sessionStorage.removeItem(ADMIN_AUTH_KEY);
  window.sessionStorage.removeItem(ADMIN_AUTH_TIME_KEY);
  window.sessionStorage.removeItem(ADMIN_ID_KEY);
  window.sessionStorage.removeItem(ADMIN_NAME_KEY);
  window.sessionStorage.removeItem(ADMIN_EMAIL_KEY);
  window.sessionStorage.removeItem(ADMIN_ROLE_KEY);
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

export function getAdminSession() {
  if (!isAdminAuthenticated() || !hasWindow()) {
    return null;
  }

  const id = window.sessionStorage.getItem(ADMIN_ID_KEY) || '';
  const name = window.sessionStorage.getItem(ADMIN_NAME_KEY) || '';
  const email = window.sessionStorage.getItem(ADMIN_EMAIL_KEY) || '';
  const role = window.sessionStorage.getItem(ADMIN_ROLE_KEY) || 'admin';

  return {
    id,
    name,
    email,
    role
  };
}

export function getAdminAuthenticated() {
  return getAdminSession();
}
