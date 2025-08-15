export function saveAuth(token, role) {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
}
export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('ngoId');
  localStorage.removeItem('donorId');
}
export function getRole() { return localStorage.getItem('role'); }
export function getToken() { return localStorage.getItem('token'); }
