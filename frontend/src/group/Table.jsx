import React from 'react'

export default class Table extends React.Component {
  render() {
    return (
      <table border={1}>
        <tr>
          <th>№</th>
          <th>Курс</th>
          <th>Студентов</th>
          <th>Факультет</th>
          <th>Действия</th>
        </tr>
        {this.props.groups.map((group, index) => (
          <tr>
            <td>{group.number}</td>
            <td>{group.course}</td>
            <td>{group.number_of_students}</td>
            <td>{group.faculty}</td>
            <td>{this.props.actions(index)}</td>
          </tr>
        ))}
      </table>
    )
  }
}