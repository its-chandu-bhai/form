import React, { useState } from 'react'

function ExpenseForm({ setExpenses }) {
    // const [title, setTitle] = useState('')
    // const [category, setCategory] = useState('')
    // const [amount, setAmount] = useState('')
    const [expense, setExpense] = useState(
        {
            title: '',
            category: '',
            amount: ''
        }
    )


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(expense)
        setExpenses((prevState) => [
            ...prevState,
            { ...expense, id: crypto.randomUUID() },
        ])
        setExpense({
            title: '',
            category: '',
            amount: '',
        })
    }


    return (
        <>
            <form className="expense-form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="title">Title</label>
                    <input id="title" name='title' value={expense.title} onChange={(e) => setExpense({ ...expense, title: e.target.value })} />
                </div>
                <div className="input-container">
                    <label htmlFor="category">Category</label>
                    <select id="category" name='category' value={expense.category} onChange={(e) => setExpense({ ...expense, category: e.target.value })}>
                        <option hidden>Select Category</option>
                        <option value="grocery">Grocery</option>
                        <option value="clothes">Clothes</option>
                        <option value="bills">Bills</option>
                        <option value="education">Education</option>
                        <option value="medicine">Medicine</option>
                    </select>

                </div>
                <div className="input-container">
                    <label htmlFor="amount">Amount</label>
                    <input id="amount" name='amount' value={expense.amount} onChange={(e) => setExpense({ ...expense, amount: e.target.value })} />
                </div>
                <button className="add-btn" >Add</button>
            </form>
        </>
    )
}

export default ExpenseForm