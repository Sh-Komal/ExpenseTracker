import React, { useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup'
import Input from '../Inputs/Input'

const AddExpenseForm = ({ onAddExpense }) => {

    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    })

    const handleChnage = (key, value) => setExpense({ ...expense, [key]: value })
    return (
        <div>

            <EmojiPickerPopup icon={expense.icon}
                onSelect={
                    (selectedIcon) => handleChnage('icon', selectedIcon)
                } />
            <Input value={expense.category}
                onChange={({ target }) => handleChnage('category', target.value)}
                label="Expense Category"
                placeholder="Rent, Groceries,  etc"
                type="text"
            />

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChnage('amount', target.value)}
                label="Amount"
                placeholder=""
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChnage('date', target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className=' flex justify-end  mt-6'>
                <button type='button' className='add-btn add-btn-fill' onClick={() => onAddExpense(expense)}>
                    Add Expense
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm