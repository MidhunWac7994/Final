import { useState, useEffect } from "react";
import useSWR from "swr";

const useSearch = (query, currentPage, sortBy, filters, clientConfig) => {
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

  const { data, error, isLoading } = useSWR(
    query
      ? [
          "https://uat.search-assist.webc.in/api/search",
          query,
          currentPage,
          sortBy,
          filters,
          clientConfig
        ]
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return { data, error, isLoading };
};

export default useSearch;
