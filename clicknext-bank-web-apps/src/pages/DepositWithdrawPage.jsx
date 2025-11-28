import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectBalance, addTransaction } from '../stores/bankSlice.js'
import Swal from 'sweetalert2'

const DepositWithdrawPage = () => {
    const [amount, setAmount] = useState('');
    const balance = useSelector(selectBalance);
    const dispatch = useDispatch();
    const handleTransaction = (type) => {
        const value = Number(amount);
        if (!value || value <= 0) {
            Swal.fire('แจ้งเตือน', 'กรุณาระบุจำนวนเงินที่ถูกต้อง', 'warning');
            return;
        } if (value > 100000) {
            Swal.fire('แจ้งเตือน', 'ทำรายการได้ไม่เกิน 100,000 บาท', 'warning');
            return;
        } if (type === 'withdraw' && value > balance) {
            Swal.fire('แจ้งเตือน', 'ยอดเงินในบัญชีไม่เพียงพอ', 'error');
            return;
        }

        dispatch(addTransaction({ amount: value, type }));
        Swal.fire({
            icon: 'success',
            title: 'ทำรายการสำเร็จ',
            text: `${type === 'deposit' ? 'ฝาก' : 'ถอน'}เงินจำนวน ${value.toLocaleString()} บาท`,
            timer: 1500,
            showConfirmButton: false
        });
        setAmount('');
    };

    return (
        <div className="card shadow-sm p-5 mx-auto" style={{ maxWidth: '600px' }}>
            <div className="text-center mb-5">
                <h4 className="text-muted mb-2">จำนวนเงินคงเหลือ</h4>
                <h1 className="display-4 fw-bold text-primary">{balance.toLocaleString()} <span className="fs-4 text-dark">บาท</span></h1>
            </div>
            <div className="mb-4">
                <label className="form-label fw-bold">จำนวนเงิน *</label>
                <input type="number" className="form-control form-control-lg" placeholder="กรอกจำนวนเงิน (ไม่เกิน 100,000)" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                <div className="form-text text-end">0 - 100,000 บาท</div>
            </div>
            <div className="row g-3">
                <div className="col-6">
                    <button className="btn btn-success w-100 btn-lg" onClick={() => handleTransaction('deposit')}>ฝาก</button>
                </div>
                <div className="col-6">
                    <button className="btn btn-danger w-100 btn-lg" onClick={() => handleTransaction('withdraw')}>ถอน</button>
                </div>
            </div>
        </div>
    );
};

export default DepositWithdrawPage;