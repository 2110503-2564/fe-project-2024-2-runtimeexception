export async function userRegister(
    userName: string,
    userTel: string,
    userEmail: string,
    userPassword: string,
    userRole: string
  ) {
    const response = await fetch(
      `https://backendforfrontend.vercel.app/api/v1/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          tel: userTel,
          email: userEmail,
          password: userPassword,
          role: userRole,
        }),
      }
    );
  
    if (!response.ok) {
      throw new Error(`Failed to register user: ${response.statusText}`);
    }
  
    return await response.json();
  }