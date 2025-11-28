import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTransaction, editTransaction } from '../stores/bankSlice.js'
import Swal from 'sweetalert2'
import { FaEdit, FaTrash } from 'react-icons/fa'

const TransactionPage = () => {
    const { transactions } = useSelector((state) => state.bank);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editAmount, setEditAmount] = useState('');

    const handleDelete = (id) => {
        Swal.fire({
            title: 'ยืนยันการลบ?',
            text: "ข้อมูลจะหายไปและยอดเงินจะถูกคำนวณใหม่",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteTransaction(id));
                Swal.fire('ลบสำเร็จ!', 'รายการถูกลบแล้ว', 'success');
                }
        });
    };

    const openEditModal = (transaction) => {
        setEditId(transaction.id);
        setEditAmount(transaction.amount);
        setShowModal(true);
    };

    const handleSaveEdit = () => {
        const value = Number(editAmount);
        if (!value || value <= 0 || value > 100000) {
            Swal.fire('แจ้งเตือน', 'ยอดเงินต้องถูกต้องและไม่เกิน 100,000', 'error');
            return;
        }
        dispatch(editTransaction({ id: editId, newAmount: value }));
        setShowModal(false);
        Swal.fire('สำเร็จ', 'แก้ไขยอดเงินเรียบร้อย', 'success');
    };

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-white py-3">
                <h4 className="mb-0 text-primary">ประวัติรายการฝาก-ถอน</h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Date/Time</th>
                                <th>Type</th>
                                <th className="text-end">Amount</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-muted">ยังไม่มีรายการ กรุณาไปฝากเงิน</td>
                                </tr>
                            ) : (transactions.slice().reverse().map((t) => (
                                    <tr key={t.id}>
                                        <td className="text-secondary small">{t.date}</td>
                                        <td>
                                            <span className={`badge ${t.type === 'deposit' ? 'bg-success' : 'bg-danger'}`}>{t.type === 'deposit' ? 'ฝาก' : 'ถอน'}</span>
                                        </td>
                                        <td className="text-end fw-bold">
                                            {t.amount.toLocaleString()}
                                        </td>
                                        <td className="text-center">
                                            <button className="btn btn-outline-warning btn-sm me-2" onClick={() => openEditModal(t)}><FaEdit /> แก้ไข</button>
                                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(t.id)}><FaTrash /> ลบ</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && ( 
                <>
                    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">แก้ไขจำนวนเงิน</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <label className="form-label">จำนวนเงินใหม่ *</label>
                                    <input type="number" className="form-control"  value={editAmount} onChange={(e) => setEditAmount(e.target.value)}/>
                                    <div className="form-text text-end">0 - 100,000 บาท</div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>ยกเลิก</button>
                                    <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>บันทึก</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TransactionPage;