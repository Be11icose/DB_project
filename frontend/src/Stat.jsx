import React from 'react'
import Api from './api'

export default class Stat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: null
    }
    this.method = 'max'
  }

  load() {
    this.setState({ number: null })
    Api.stat(this.method).then(resp => {
      this.setState({ number: resp.data })
    })
  }

  componentDidMount() {
    this.load()
  }

  render() {
    const number = this.state.number
    return (
      <div>Группа с <select onChange={e => {
        this.method = e.target.value
        this.load()
      }}>
        <option value='max'>наибольшим</option>
        <option value='min'>наименьшим</option>
        </select> количеством сдач: <b>{number === null ? '..' : number}</b></div>
    )
  }
}