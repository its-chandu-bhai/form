import React, { useEffect, useRef, useState } from 'react'
import Input from './Input'
import Select from './Select'

export default function ExpenseForm({ setExpenses, expense, setExpense, editingRowId, setEditingRowId }) {

    // --------- expense or setexpense ka use hmm edit functionality ka lia use kr rha ha inko copy krka app.jsx file me rkh rha ha taki wha se wo lifting ho pay expenseForm.jsx file ka andar contextMenu.jsx file se
    // const [expense, setExpense] = useState({
    //     title: '',
    //     category: '',
    //     amount: '',
    //     // email: '',
    // })

    const [errors, setErrors] = useState({})

    const validationConfig = {
        title: [
            { required: true, message: 'Please enter title' },
            { minLength: 2, message: 'Title should be at least 2 characters long' },
        ],
        category: [{ required: true, message: 'Please select a category' }],
        amount: [
            { required: true, message: 'Please enter an amount' },
            { pattern: /^-?(0|[1-9]\d*)(?<!-0)$/, message: 'Please enter a valid number' }
        ],
        // email: [
        //     { required: true, message: 'Please enter an email' },
        //     {
        //         pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        //         message: 'Please enter a valid email',
        //     },
        // ],
    }

    const validate = (formData) => {
        const errorsData = {}

        Object.entries(formData).forEach(([key, value]) => {
            validationConfig[key].some((rule) => {
                if (rule.required && !value) {
                    errorsData[key] = rule.message
                    return true
                }

                if (rule.minLength && value.length < rule.minLength) {
                    errorsData[key] = rule.message
                    return true
                }

                if (rule.pattern && !rule.pattern.test(value)) {
                    errorsData[key] = rule.message
                    return true
                }
            })
        })

        setErrors(errorsData)
        return errorsData
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const validateResult = validate(expense)

        if (Object.keys(validateResult).length) return

        if (editingRowId) {
            setExpenses((prevState) =>
                prevState.map((prevExpense) => {
                    if (prevExpense.id === editingRowId) {
                        return { ...expense, id: editingRowId }
                    }
                    return prevExpense
                })
            )
            setExpense({
                title: '',
                category: '',
                amount: '',
                // email: '',
            })
            setEditingRowId('')
            return
        }

        setExpenses((prevState) => [
            ...prevState,
            { ...expense, id: crypto.randomUUID() },
        ])
        setExpense({
            title: '',
            category: '',
            amount: '',
            // email: '',
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setExpense((prevState) => ({
            ...prevState,
            [name]: value,
        }))
        setErrors({})
    }

    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <Input
                label="Title"
                id="title"
                name="title"
                value={expense.title}
                onChange={handleChange}
                error={errors.title}
            />
            <Select
                label="Category"
                id="category"
                name="category"
                value={expense.category}
                onChange={handleChange}
                options={['Grocery', 'Clothes', 'Bills', 'Education', 'Medicine']}
                defaultOption="Select Category"
                error={errors.category}
            />
            <Input
                label="Amount"
                id="amount"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
                error={errors.amount}
            />
            {/* <Input
                label="Email"
                id="email"
                name="email"
                value={expense.email}
                onChange={handleChange}
                error={errors.email}
            /> */}
            <button className="add-btn">{editingRowId ? 'Save' : 'Add'}</button>
        </form>
    )
}