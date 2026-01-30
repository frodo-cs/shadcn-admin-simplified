import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Item } from '../schemas/item'

type ItemsDialogType = 'add' | 'edit' | 'delete'

type ItemsContextType = {
  open: ItemsDialogType | null
  setOpen: (str: ItemsDialogType | null) => void
  currentRow: Item | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Item | null>>
}

const ItemsContext = React.createContext<ItemsContextType | null>(null)

export function ItemsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<ItemsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Item | null>(null)

  return (
    <ItemsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </ItemsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useItems = () => {
  const itemsContext = React.useContext(ItemsContext)

  if (!itemsContext) {
    throw new Error('useItems has to be used within <ItemsContext>')
  }

  return itemsContext
}
