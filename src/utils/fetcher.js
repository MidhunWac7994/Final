export const fetcher = async ([url, query, page, sortBy]) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Client-id": "7645129791",
        "Secret-key": "Qfj1UUkFItWfVFwWpJ65g0VfhjdVGN",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: query,
        size: 28,
        sort_by: parseInt(sortBy),
        page: page,
        page_size: 28,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch data");
    }

    const responseText = await response.text();
    console.log("Raw Response Text:", responseText);
    if (!responseText) {
      throw new Error("Empty response from the server");
    }

    const data = JSON.parse(responseText);
    console.log("Parsed API response:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
