import React from 'react'
import Api from '../api'


export default class Add extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      disabled: false,
    }
    this.id = 'add-subject'
  }

  render() {
    // name, department, hours
    return (
      this.state.open ? (
        <form id={this.id} onSubmit={e => {
          e.preventDefault()
          this.setState({ disabled: true })
          const form = document.getElementById(this.id)
          const data = new FormData(form)
          Api.addSubject(
            data.get('name'),
            data.get('department'),
            data.get('hours')
          ).then(_ => {
            this.setState({ disabled: false })
            form.reset()
            this.props.onDone()
          })
        }}>
          <input name='name' type='text' placeholder='Предмет' /><br />
          <input name='department' type='text' placeholder='Факультет' /><br />
          <input name='hours' type='number' placeholder='Число часов' /><br />
          <button type='submit' disabled={this.state.disabled}>Добавить предмет</button>
          <button type='reset' onClick={() => this.setState({ open: false })}>Отмена</button>
        </form>
      ) : (
        <button onClick={() => this.setState({ open: true })}>Добавить</button>
      )
    )
  }
}