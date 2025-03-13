import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationControl = ({ currentPage, totalPages, handlePageChange }) => {
  const renderPaginationItems = () => {
    const items = [];
    const maxButtons = 5;
    const halfButtons = Math.floor(maxButtons / 2);

    let startPage = currentPage - halfButtons;
    let endPage = currentPage + halfButtons;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(startPage + maxButtons - 1, totalPages);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxButtons + 1, 1);
    }

    if (startPage > 1) {
      items.push(
        <Pagination.Item
          key={1}
          active={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          1
        </Pagination.Item>
      );

      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="ellipsis-start" />);
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={currentPage === page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="ellipsis-end" />);
      }

      items.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        {currentPage > 1 && (
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
          />
        )}

        {renderPaginationItems()}

        {currentPage < totalPages && (
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
          />
        )}
      </Pagination>
    </div>
  );
};

export default PaginationControl;