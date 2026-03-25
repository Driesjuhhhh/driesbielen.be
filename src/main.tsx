
import { createRoot } from 'react-dom/client'
import React, { useEffect } from 'react'
import { init } from '@plausible-analytics/tracker'
import App from './app/App.tsx'
import './styles/index.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

init({
  domain: 'driesbielen.be',
  endpoint: 'https://plausible.driesbielen.be/api/event',
})

  function Main() {
    useEffect(() => {
      AOS.init({ duration: 800, once: true })
    }, [])

    return <App />
  }

  createRoot(document.getElementById('root')!).render(<Main />)
  
