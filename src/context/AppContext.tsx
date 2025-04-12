import { createContext, useContext } from 'react'

export type AppContextType = {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void
  screenSize: number
  setScreenSize: (size: number) => void
}

export const themeContextDefaultValue: AppContextType = {
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
  screenSize: 0,
  setScreenSize: () => {}
}

export const AppContext = createContext<AppContextType>(themeContextDefaultValue)

export function useAppContext() {
  return useContext(AppContext)
}
