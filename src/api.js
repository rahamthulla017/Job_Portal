// Change BACKEND_URL to your json-server endpoint, or leave empty for localStorage mode
export const BACKEND_URL = 'http://localhost:4000/applications';

export async function fetchApplications() {
  if (!BACKEND_URL) {
    const data = localStorage.getItem('applications');
    return data ? JSON.parse(data) : [];
  }
  try {
    const res = await fetch(BACKEND_URL);
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('fetchApplications error:', err);
    // Return empty list on failure so UI can continue working offline
    return [];
  }
}

export async function submitApplication(data) {
  if (!BACKEND_URL) {
    const current = localStorage.getItem('applications');
    const apps = current ? JSON.parse(current) : [];
    apps.push(data);
    localStorage.setItem('applications', JSON.stringify(apps));
    return;
  }
  try {
    const res = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('submitApplication error:', err);
    // Re-throw so callers can show user-facing errors
    throw err;
  }
}
