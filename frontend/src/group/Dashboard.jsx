import React from 'react'
import Api from '../api'
import Table from './Table'
import Add from './Add'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      groups: []
    }
  }

  load() {
    this.setState({ loading: true })
    Api.getGroups().then(resp => {
      const groups = resp.data
      this.setState({ groups, loading: false })
    })
  }

  componentDidMount() {
    this.load()
  }

  render() {
    return (
      <div className='dashboard'>
        <h1>Группы</h1>
        <div style={{
          opacity: this.state.loading ? .5 : 1,
          pointerEvents: this.state.loading ? 'none' : ''
        }}>
          <Add onDone={() => this.load()} />
          <Table
            groups={this.state.groups}
            actions={index => (
              <div>
                <button onClick={() => {
                  const number = this.state.groups[index].number
                  this.setState({ loading: true })
                  Api.deleteGroup(number).then(() => {
                    this.load()
                  })
                }}>Удалить</button>
                <button onClick={() => {
                  const number = this.state.groups[index].number
                  Api.getSessionsByGroup(number).then(resp => {
                    this.props.onOpenModal(
                      <div>
                        <h1>Расписание сессии для группы {number}</h1>
                        <table border={1}>
                          <tr>
                            <th>Дата</th>
                            <th>Предмет</th>
                            <th>Форма контроля</th>
                          </tr>
                          {resp.data.map(session => (
                            <tr>
                              <td>{session.date}</td>
                              <td>{session.subject}</td>
                              <td>{session.control === 'exam' ? 'Экзамен' : 'Зачёт'}</td>
                            </tr>
                          ))}
                        </table>
                      </div>
                    )
                  })
                }}>Показать сессию</button>
              </div>
            )}
          />
        </div>
      </div>
    )
  }
}