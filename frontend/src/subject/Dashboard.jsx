import React from 'react'
import Api from '../api'
import Table from './Table'
import Add from './Add'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      subjects: []
    }
  }

  load() {
    this.setState({ loading: true })
    Api.getSubjects().then(resp => {
      const subjects = resp.data
      this.setState({ subjects, loading: false })
    })
  }

  componentDidMount() {
    this.load()
  }

  render() {
    return (
      <div className='dashboard'>
        <h1>Предметы</h1>
        <div style={{
          opacity: this.state.loading ? .5 : 1,
          pointerEvents: this.state.loading ? 'none' : ''
        }}>
          <Add onDone={() => this.load()} />
          <Table subjects={this.state.subjects} />
        </div>
      </div>
    )
  }
}