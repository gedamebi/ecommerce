import { createContext, useContext } from 'react'

export const notificationContext = createContext()

export const useNotification = () => useContext(notificationContext)