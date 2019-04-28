import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  getCell(item, column) {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  }
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map((column, index) => (
              <td key={index}>{this.getCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
