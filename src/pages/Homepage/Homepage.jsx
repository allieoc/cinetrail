import React from 'react'
import './Homepage.css'
import Slider from '../../components/Slider/Slider'

function Homepage({ apiKey, baseUrl }) {
  return (
    <Slider apiKey={apiKey} baseUrl={baseUrl} />
  )
}

export default Homepage