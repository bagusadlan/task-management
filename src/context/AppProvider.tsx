import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
import { AppContext, themeContextDefaultValue, AppContextType } from './AppContext'

export default function AppProvider({ children }: { children: ReactNode }) {
  const [screenSize, setScreenSize] = useState<AppContextType['screenSize']>(themeContextDefaultValue.screenSize)
  const [isSidebarOpen, setIsSidebarOpen] = useState<AppContextType['isSidebarOpen']>(
    themeContextDefaultValue.isSidebarOpen
  )

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isSidebarOpen])

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        screenSize,
        setScreenSize
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
