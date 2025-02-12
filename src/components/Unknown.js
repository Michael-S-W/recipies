import React from 'react'
import { NavLink } from 'react-router-dom'

const Unknown = () => {
  return (
    <div className='mt-5 text-center'>
      <h1>Shhhh... 🤫</h1>
      <h2>Page Isn't Available</h2>
      <NavLink to={'/'} style={{color:'black', textDecoration:'none'}}>Back to homepage</NavLink>
    </div>
  )
}

export default Unknown
