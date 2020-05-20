import React from 'react'

export default class Table extends React.Component {
  render() {
    return (
      <table border={1}>
        <tr>
          <th>Название</th>
          <th>Кафедра</th>
          <th>Число часов</th>
        </tr>
        {this.props.subjects.map((subject, index) => (
          <tr>
            <td>{subject.name}</td>
            <td>{subject.department}</td>
            <td>{subject.hours}</td>
          </tr>
        ))}
      </table>
    )
  }
}
