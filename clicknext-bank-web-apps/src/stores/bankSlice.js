	import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    transactions: [],
};

const bankSlice = createSlice({
    name: 'bank',
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            state.transactions.push({
                id: Date.now(),
                date: new Date().toLocaleString('en-GB'),
                ...action.payload
            });
        },
        editTransaction: (state, action) => {
            const { id, newAmount } = action.payload;
            const found = state.transactions.find(t => t.id === id);
            if (found) {
                found.amount = Number(newAmount);
            }
        },
        deleteTransaction: (state, action) => {
            const idToDelete = action.payload;
            state.transactions = state.transactions.filter(t => t.id !== idToDelete);
        },
    },
});

export const { addTransaction, editTransaction, deleteTransaction } = bankSlice.actions;
export const selectBalance = (state) => {
    return state.bank.transactions.reduce((total, t) => {
        if (t.type === 'deposit') return total + Number(t.amount);
        if (t.type === 'withdraw') return total - Number(t.amount);
        return total;
    }, 0);
};
export default bankSlice.reducer;