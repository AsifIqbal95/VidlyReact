import React from "react";

const Filter = props => {
  const { filterItems, currentItem, valueProperty, textProperty } = props;
  //   const classname = "list-group-item";
  return (
    <ul className="list-group">
      {filterItems.map(item => (
        <li
          key={item[valueProperty]}
          onClick={() => props.onFilterChange(item[valueProperty])}
          className={
            item[valueProperty] === currentItem
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Filter.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default Filter;
