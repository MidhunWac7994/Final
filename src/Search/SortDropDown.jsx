import { Dropdown } from "react-bootstrap";

const SortDropdown = ({ currentSortLabel, sortOptions, handleSortChange }) => {
  return (
    <Dropdown onSelect={handleSortChange}>
      <Dropdown.Toggle
        variant="outline-secondary"
        id="dropdown-sort"
        className="d-flex align-items-center"
      >
        {currentSortLabel}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {sortOptions.map((option) => (
          <Dropdown.Item key={option.value} eventKey={option.value}>
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropdown;
