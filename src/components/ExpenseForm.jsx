import React, { useEffect, useState } from 'react'

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

    const [errors, setErrors] = useState({})

    const validate = (formData) => {
        // console.log(formData)
        const errorsData = {}

        // if (!formData.title) {
        //     errorsData.title = 'Title is required'
        // }

        if (!formData.category) {
            errorsData.category = "Category is required"
        }

        if (!formData.amount) {
            errorsData.amount = "Amount is required"
        }

        setErrors(errorsData)
        return errorsData

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(expense)

        const validateResult = validate(expense)
        console.log(validateResult)
        // console.log(!Object.keys(validateResult).length)
        if (Object.keys(validateResult).length) return  // If there are errors, do not proceed

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

    // useEffect(() => {
    //     console.log(expense) 
    // }, [expense])

    const handleChange = (e) => {
        // console.log(e.target)
        const { name, value } = e.target
        setExpense({ ...expense, [name]: value })   // Dynamically update the state based on input name, [name] isko as a js array key treat karta hai
        setErrors({ ...errors, [name]: '' }) // Clear the error for the specific field being edited
    }

    return (
        <>
            <form className="expense-form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="title">Title</label>
                    <input id="title" name='title' value={expense.title} onChange={handleChange} />
                    <p className='error'>{errors.title}</p>
                </div>
                <div className="input-container">
                    <label htmlFor="category">Category</label>
                    <select id="category" name='category' value={expense.category} onChange={handleChange}>
                        <option hidden>Select Category</option>
                        <option value="grocery">Grocery</option>
                        <option value="clothes">Clothes</option>
                        <option value="bills">Bills</option>
                        <option value="education">Education</option>
                        <option value="medicine">Medicine</option>
                    </select>
                    <p className='error'>{errors.category}</p>

                </div>
                <div className="input-container">
                    <label htmlFor="amount">Amount</label>
                    <input id="amount" name='amount' value={expense.amount} onChange={handleChange} />
                    <p className='error'>{errors.amount}</p>
                </div>
                <button className="add-btn" >Add</button>
            </form>
        </>
    )
}

export default ExpenseForm