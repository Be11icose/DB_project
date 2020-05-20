import React from 'react';
import GroupsDashboard from './group/Dashboard';
import SubjectsDashboard from './subject/Dashboard'
import SessionsDashboard from './session/Dashboard'
import Stat from './Stat';
import Modal from './Modal';


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalContent: null
    }
  }

  render() {
    return (
      <div style={{
        height: '100%'
      }}>
        <div><Stat /></div>
        <div>
          <GroupsDashboard onOpenModal={content => {
            this.setState({ modalContent: content })
          }} />
          <SubjectsDashboard />
          <SessionsDashboard onOpenModal={content => {
            this.setState({ modalContent: content })
          }} />
        </div>
        <Modal
          open={this.state.modalContent !== null}
          onClose={() => this.setState({ modalContent: null })}
        >{this.state.modalContent}</Modal>
      </div>
    )
  }
}