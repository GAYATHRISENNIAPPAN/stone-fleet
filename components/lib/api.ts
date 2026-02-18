// components/lib/api.ts

const BASE_URL = "https://z0g9fqpb-8080.inc1.devtunnels.ms/login";

export const postApi = async (endpoint: string, data: any) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Token: "", // add token here if backend requires
        Data: data,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.Message || "API request failed");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
