import '/src/index.scss'

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

import styles from './main.module.scss'

import Test from './Test'

function Main() {
  return (
    <div className={styles.container}>
      <Test />

      <div className={styles.watermark}>
        Test environment
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
