import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import App from './App'
import { serverUrl } from './config'

axios.defaults.baseURL = serverUrl

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
