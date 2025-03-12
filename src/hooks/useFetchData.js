import useSWR from 'swr';

const fetcher = async ([url, query, page, sortBy, filters, config]) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Client-id": config.clientId,
        "Secret-key": config.secretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: query,
        size: 28,
        sort_by: parseInt(sortBy),
        page: page,
        page_size: 28,
        filter: {
          category: filters.categories.length > 0 ? filters.categories : undefined,
          price: filters.priceRange,
          brand: filters.brands.length > 0 ? filters.brands : undefined,
          model: filters.models.length > 0 ? filters.models : undefined,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

const useFetchData = (searchQuery, currentPage, sortBy, filters, selectedClient) => {
  const clientConfig = {
    english: {
      clientId: "7645129791",
      secretKey: "Qfj1UUkFItWfVFwWpJ65g0VfhjdVGN",
      indexName: "cv8mpreahlm7632gb530"
    },
    arabic: {
      clientId: "5807942863",
      secretKey: "Llz5MR37gZ4gJULMwf762w1lQ13Iro",
      indexName: "qa-ar"
    }
  };

  const { data, error, isLoading } = useSWR(
    searchQuery
      ? [
          "https://uat.search-assist.webc.in/api/search",
          searchQuery,
          currentPage,
          sortBy,
          filters,
          clientConfig[selectedClient]
        ]
      : null,
    fetcher,
    { 
      revalidateOnFocus: false,
      onSuccess: (data) => {
        console.log("API response data:", data);
      },
      onError: (error) => {
        console.error("API error:", error);
      }
    }
  );

  return { data, error, isLoading };
};

export default useFetchData;
