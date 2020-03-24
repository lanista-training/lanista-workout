
import App from 'next/app'
import React from 'react'
import {ThemeProvider } from 'styled-components'
import defaultTheme from '../themes/default'

class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={defaultTheme}>
        <Component {...pageProps}/>
      </ThemeProvider>
    )
  }
}

export default MyApp
