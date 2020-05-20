import React from 'react'

export default class Table extends React.Component {
  render() {
    return (
      <table border={1}>
        <tr>
          <th>Препод</th>
          <th>Форма контроля</th>
          <th>Дата</th>
          <th>Группа</th>
          <th>Предмет</th>
          <th>Действия</th>
        </tr>
        {this.props.sessions.map((session, index) => (
          <tr>
            <td>{session.teacher}</td>
            <td>{session.control == 'exam' ? 'Экзамен' : 'Зачёт'}</td>
            <td>{session.date}</td>
            <td>{session.group.number}</td>
            <td>{session.subject.name}</td>
            <td>{this.props.actions(index)}</td>
          </tr>
        ))}
      </table>
    )
  }
}