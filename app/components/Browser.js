
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeTab, goLeft, goRight } from 'actions/tabs'

import Webview from 'components/Webview'
import Frame from 'components/Frame'

if (process.env.BROWSER) {
  require('styles/Browser.scss')
}

@connect(
  state => ({
    current: state.tabs.current,
    tabs: state.tabs.tabs,
    shortcut: state.shortcuts.emitter,
  })
)
class Browser extends Component {

  state = {
    addressFocus: false,
  }

  componentDidMount () {

    const { shortcut, dispatch } = this.props

    shortcut.on('remove:tab', () => dispatch(removeTab(current)))
    shortcut.on('tab:left', () => dispatch(goLeft()))
    shortcut.on('tab:right', () => dispatch(goRight()))

  }

  render () {

    const { current, tabs } = this.props

    return (
      <div className='Browser'>
        <Frame />
        <div className='web-wrapper'>
          {tabs.map((tab, index) => {
            return (
              <Webview
                addressFocus={this.state.addressFocus}
                src={tab.history[tab.url]}
                active={current === index}
                index={index}
                key={index} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Browser
