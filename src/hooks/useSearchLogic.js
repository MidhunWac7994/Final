import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useSearchLogic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const initialQuery = new URLSearchParams(location.search).get("q") || "";
  
  const [currentPage, setCurrentPage] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    return pageParam ? parseInt(pageParam) : 1;
  });

  const initialClient = new URLSearchParams(location.search).get("client") || "english";
  const [selectedClient, setSelectedClient] = useState(initialClient);
  
  const [sortBy, setSortBy] = useState("1"); // Default "1" for Relevance
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    models: [],
    priceRange: [0, 10000],
  });
  const [searchQuery, setSearchQuery] = useState(initialQuery);

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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("q", searchQuery);
    searchParams.set("client", selectedClient);

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

    if (currentPage !== 1) {
      searchParams.set("page", currentPage.toString());
    } else {
      searchParams.delete("page");
    }

    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [filters, searchQuery, currentPage, selectedClient, location.search, navigate]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(filters.totalItems / 28)) {
      setCurrentPage(page);
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (type, value) => {
    if (type === "brands" || type === "categories" || type === "models") {
      setFilters({
        ...filters,
        [type]: filters[type].includes(value)
          ? filters[type].filter((item) => item !== value)
          : [...filters[type], value],
      });
    } else if (type === "priceRange") {
      setFilters({
        ...filters,
        priceRange: value,
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}&client=${selectedClient}`);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedClient,
    setSelectedClient,
    currentPage,
    setCurrentPage,
    filters,
    setFilters,
    handlePageChange,
    handleSortChange,
    handleFilterChange,
    handleSearch,
  };
};

export default useSearchLogic;
