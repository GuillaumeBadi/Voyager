
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Webview from 'components/Webview'
import Frame from 'components/Frame'

if (process.env.BROWSER) {
  require('styles/Browser.scss')
}

@connect(
  state => ({
    current: state.tabs.current,
    tabs: state.tabs.tabs,
  })
)
class Browser extends Component {

  render () {

    const { current, tabs } = this.props

    return (
      <div className='Browser'>
        <Frame />
        <div className='web-wrapper'>
          {tabs.map((tab, index) => {
            return (
              <Webview
                src={tab.url}
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
