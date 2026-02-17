// lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("API base URL not defined in .env.local");
}

/**
 * Universal POST API function
 * Every request follows:
 * {
 *   Token: string,
 *   Data: {}
 * }
 */
export async function postApi<T = any>(
  endpoint: string,
  data: any
): Promise<T> {
  try {
    // Get token from localStorage
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token") || ""
        : "";

    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Token: token,
        Data: data,
      }),
    });

    const result = await response.json();

    // Handle API error
    if (!response.ok) {
      throw new Error(result?.message || "API Error");
    }

    return result;

  } catch (error: any) {
    throw new Error(error.message || "Network Error");
  }
}
