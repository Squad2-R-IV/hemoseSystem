export default function getUserIdFromLocalStorage() {
  const jwtToken = localStorage.getItem("token");
    if (!jwtToken) return null;
    const payload = jwtToken.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));
    const userId = decodedPayload.id;
    return userId;
    
}