export const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
export function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
