import React from 'react'
import Api from '../api'


export default class Add extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      disabled: false,
    }
    this.id = 'add-group'
  }

  render() {
    // number, course, number_of_students, faculty
    return (
      this.state.open ? (
        <form id={this.id} onSubmit={e => {
          e.preventDefault()
          this.setState({ disabled: true })
          const form = document.getElementById(this.id)
          const data = new FormData(form)
          Api.addGroup(
            data.get('number'),
            data.get('course'),
            data.get('number_of_students'),
            data.get('faculty')
          ).then(_ => {
            this.setState({ disabled: false })
            form.reset()
            this.props.onDone()
          })
        }}>
          <input name='number' type='number' placeholder='Номер' size={8} /><br />
          <input name='course' type='number' placeholder='Курс' size={7} /><br />
          <input name='number_of_students' type='number' placeholder='Число студентов' /><br />
          <input name='faculty' type='text' placeholder='Факультет' /><br />
          <button type='submit' disabled={this.state.disabled}>Добавить группу</button>
          <button type='reset' onClick={() => this.setState({ open: false })}>Отмена</button>
        </form>
      ) : (
        <button onClick={() => this.setState({ open: true })}>Добавить</button>
      )
    )
  }
}