import React from 'react'


export default class Modal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,.5)',
        display: this.props.open ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center'
      }} onClick={() => this.props.onClose()}>
        <div style={{
          background: 'white',
          padding: 20
        }} onClick={e => e.stopPropagation()}>
          <div>{this.props.children}</div>
          <div>
            <button onClick={() => this.props.onClose()}>Закрыть</button>
          </div>
        </div>
      </div>
    )
  }
}