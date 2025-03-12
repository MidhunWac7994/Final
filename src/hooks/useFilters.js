import { useState, useEffect } from "react";

const useFilters = (location, navigate) => {
  const initialFilters = {
    brands: [],
    categories: [],
    models: [],
    priceRange: [0, 10000],
  };

  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const brands = searchParams.get("brands")?.split(",") || [];
    const categories = searchParams.get("categories")?.split(",") || [];
    const models = searchParams.get("models")?.split(",") || [];
    const priceMin = parseInt(searchParams.get("priceMin")) || 0;
    const priceMax = parseInt(searchParams.get("priceMax")) || 10000;

    setFilters({
      brands,
      categories,
      models,
      priceRange: [priceMin, priceMax],
    });
  }, [location.search]);

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type].includes(value)
        ? prevFilters[type].filter((item) => item !== value)
        : [...prevFilters[type], value],
    }));
  };

  const handlePriceRangeChange = (value) => {
    setFilters({
      ...filters,
      priceRange: value,
    });
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("q", filters.searchQuery);

    if (filters.brands.length > 0) {
      searchParams.set("brands", filters.brands.join(","));
    } else {
      searchParams.delete("brands");
    }

    if (filters.categories.length > 0) {
      searchParams.set("categories", filters.categories.join(","));
    } else {
      searchParams.delete("categories");
    }

    if (filters.models.length > 0) {
      searchParams.set("models", filters.models.join(","));
    } else {
      searchParams.delete("models");
    }

    searchParams.set("priceMin", filters.priceRange[0].toString());
    searchParams.set("priceMax", filters.priceRange[1].toString());

    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [filters, location.search, navigate]);

  return {
    filters,
    handleFilterChange,
    handlePriceRangeChange,
    handleResetFilters,
  };
};

export default useFilters;
