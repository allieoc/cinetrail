import React from 'react'
import ThemeContextProvider from './ThemeContext'
import UserContextProvider from './UserContext'

function ContextReducer({children}) {
  return (
    <ThemeContextProvider>
        <UserContextProvider>
            {children}
        </UserContextProvider>
    </ThemeContextProvider>
  )
}

export default ContextReducer