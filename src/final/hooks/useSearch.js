import { useState, useEffect } from "react";
import useSWR from "swr";
import { useLocation, useNavigate } from "react-router-dom";
import {fetcher, getClientConfig} from '../utils/api'
const useSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const initialQuery = searchParams.get("q") || "";
  const initialClient = searchParams.get("client") || "english";
  const initialPage = parseInt(searchParams.get("page")) || 1;
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedClient, setSelectedClient] = useState(initialClient);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sortBy, setSortBy] = useState("1");
  
  const [filters, setFilters] = useState({
    brands: searchParams.get("brands")?.split(",").filter(Boolean) || [],
    categories: searchParams.get("categories")?.split(",").filter(Boolean) || [],
    models: searchParams.get("models")?.split(",").filter(Boolean) || [],
    priceRange: [
      parseInt(searchParams.get("priceMin")) || 0,
      parseInt(searchParams.get("priceMax")) || 10000
    ],
  });


  useEffect(() => {
    const searchParams = new URLSearchParams();
    
    if (searchQuery) searchParams.set("q", searchQuery);
    searchParams.set("client", selectedClient);
    
    if (filters.brands.length > 0) {
      searchParams.set("brands", filters.brands.join(","));
    }

    if (filters.categories.length > 0) {
      searchParams.set("categories", filters.categories.join(","));
    }

    if (filters.models.length > 0) {
      searchParams.set("models", filters.models.join(","));
    }

    searchParams.set("priceMin", filters.priceRange[0].toString());
    searchParams.set("priceMax", filters.priceRange[1].toString());
    
    if (currentPage !== 1) {
      searchParams.set("page", currentPage.toString());
    }

    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [filters, searchQuery, currentPage, selectedClient, navigate]);

  
  const { data, error, isLoading } = useSWR(
    searchQuery
      ? [
          "https://uat.search-assist.webc.in/api/search",
          searchQuery,
          currentPage,
          sortBy,
          filters,
          getClientConfig(selectedClient)
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
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      brands: [],
      categories: [],
      model_name: [],
      priceRange: [0, 10000],
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    const totalPages = Math.ceil((data?.total || 0) / 28);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage(1);
    }
  };

  const handleLanguageChange = (language) => {
    setSelectedClient(language);
    setCurrentPage(1);
  };

  return {

    searchQuery,
    selectedClient,
    currentPage,
    sortBy,
    filters,
    data,
    error,
    isLoading,
    

    setSearchQuery,
    handleFilterChange,
    handleResetFilters,
    handlePageChange,
    handleSortChange,
    handleSearch,
    handleLanguageChange
  };
};

export default useSearch;