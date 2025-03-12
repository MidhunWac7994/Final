import { useState, useEffect } from "react";

const usePagination = (location, navigate, totalItems) => {
  const [currentPage, setCurrentPage] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    return pageParam ? parseInt(pageParam) : 1;
  });

  const totalPages = Math.ceil(totalItems / 28);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", currentPage.toString());
    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [currentPage, location.search, navigate]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return { currentPage, handlePageChange, totalPages };
};

export default usePagination;
