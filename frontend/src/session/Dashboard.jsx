import React from 'react'
import Api from '../api'
import Table from './Table'
import Add from './Add'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      sessions: []
    }
  }

  load() {
    this.setState({ loading: true })
    Api.getSessions().then(resp => {
      const sessions = resp.data
      this.setState({ sessions, loading: false })
    })
  }

  componentDidMount() {
    this.load()
  }

  render() {
    return (
      <div className='dashboard'>
        <h1>Сессия</h1>
        <div style={{
          opacity: this.state.loading ? .5 : 1,
          pointerEvents: this.state.loading ? 'none' : ''
        }}>
          <Add onDone={() => this.load()} />
          <Table
            sessions={this.state.sessions}
            actions={index => (
              <div>
                <button onClick={() => {
                  const session = this.state.sessions[index]
                  this.setState({ loading: true })
                  Api.deleteSession(session.group.number, session.date).then(() => {
                    this.load()
                  })
                }}>Удалить</button>
                <button onClick={() => {
                  const teacher = this.state.sessions[index].teacher
                  Api.getSessionsByTeacher(teacher).then(resp => {
                    this.props.onOpenModal(
                      <div>
                        <h1>Расписание сессии для препода &laquo;{teacher}&raquo;</h1>
                        <table border={1}>
                          <tr>
                            <th>Группа</th>
                            <th>Дата</th>
                          </tr>
                          {resp.data.map(session => (
                            <tr>
                              <td>{session.group}</td>
                              <td>{session.date}</td>
                            </tr>
                          ))}
                        </table>
                      </div>
                    )
                  })
                }}>Показать расписание препода</button>
              </div>
            )}
          />
        </div>
      </div>
    )
  }
}