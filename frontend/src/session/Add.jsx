import React from 'react'
import Api from '../api'


export default class Add extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      disabled: false,
    }
    this.id = 'add-session'
  }

  render() {
    // teacher, control, date, groupNumber, subjectName
    return (
      this.state.open ? (
        <form id={this.id} onSubmit={e => {
          e.preventDefault()
          this.setState({ disabled: true })
          const form = document.getElementById(this.id)
          const data = new FormData(form)
          Api.addSession(
            data.get('teacher'),
            data.get('control'),
            data.get('date'),
            data.get('groupNumber'),
            data.get('subjectName')
          ).then(_ => {
            this.setState({ disabled: false })
            form.reset()
            this.props.onDone()
          })
        }}>
          <input name='teacher' type='text' placeholder='Препод' /><br />
          <select name='control'>
            <option value='exam'>Экзамен</option>
            <option value='pass-fail'>Зачёт</option>
          </select>
          <input name='date' type='date' placeholder='Дата' /><br />
          <input name='groupNumber' type='text' placeholder='Номер группы' /><br />
          <input name='subjectName' type='text' placeholder='Предмет' /><br />
          <button type='submit' disabled={this.state.disabled}>Добавить сдачу</button>
          <button type='reset' onClick={() => this.setState({ open: false })}>Отмена</button>
        </form>
      ) : (
        <button onClick={() => this.setState({ open: true })}>Добавить</button>
      )
    )
  }
}