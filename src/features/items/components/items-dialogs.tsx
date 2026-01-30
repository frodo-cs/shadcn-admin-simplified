import { ItemsActionDialog } from './items-action-dialog'
import { ItemsDeleteDialog } from './items-delete-dialog'
import { useItems } from './items-provider'

export function ItemsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useItems()
  return (
    <>
      <ItemsActionDialog
        key='item-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <ItemsActionDialog
            key={`item-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ItemsDeleteDialog
            key={`item-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
