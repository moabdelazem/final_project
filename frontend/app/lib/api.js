// !! THIS FUNCTION HAVE SOME ISSUES IT RETURN ERROR OF STATUS 422 !!
// !! UNPROCESSABLE ENTITY !!
// !! I WILL FIX IT LATER !!
export async function apiCall(endpoint, method, body) {
  // Make an API call to the endpoint with the specified method and body

  console.log("apiCall", endpoint, method, body);

  try {
    // Make the API call
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      }
    );

    // If the API call fails, throw an error
    if (!response.ok) {
      throw new Error("API call failed");
    }

    // Parse the JSON response
    const data = await response.json();
    return { data };
  } catch (error) {
    // If an error occurs, return the error message
    return { error: error.message };
  }
}
