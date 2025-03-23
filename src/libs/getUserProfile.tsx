export default async function getUserProfile(token: string) {
    const response = await fetch("http://localhost:5000/api/v1/auth/me", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`, // Corrected template literal
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }
  
    return response.json();
  }