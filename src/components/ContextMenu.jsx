function ContextMenu({ menuPosition, setMenuPosition, setExpenses, rowId, expenses, setExpense }) {
  if (!menuPosition.left) return;

  return (
    <div className="context-menu" style={{ ...menuPosition }}>
      <div
        onClick={() => {
          console.log(rowId)
          const foundExpense = expenses.find((expense) => expense.id === rowId)
          // console.log(foundExpense)
          setExpense(foundExpense)
          setMenuPosition({})
        }}>
        Edit
      </div>
      <div
        onClick={() => {
          setExpenses((prevState) => prevState.filter((expense) => expense.id !== rowId))
          setMenuPosition({})
        }}>
        Delete
      </div>
    </div>
  )
}

export default ContextMenu