import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaMoneyBillWave, FaHistory, FaTimes } from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className="offcanvas-md offcanvas-start bg-white border-end" tabIndex="-1" id="sidebarMenu" style={{ width: '300px' }}>
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title fw-bold text-primary">Menu</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body d-flex flex-column p-3 h-100">
        <div className="d-grid gap-2">
          <NavLink to="/deposit" className={({ isActive }) => isActive ? "btn btn-dark text-start d-flex align-items-center" : "btn btn-light text-start d-flex align-items-center text-dark"}>
              <FaMoneyBillWave className="me-2" /> 
              Deposit / Withdraw
          </NavLink>
          <NavLink to="/transaction" className={({ isActive }) => isActive ? "btn btn-dark text-start d-flex align-items-center" : "btn btn-light text-start d-flex align-items-center text-dark"}>
            <FaHistory className="me-2" /> 
            Transaction History
          </NavLink>
        </div>        
        <div className="mt-auto text-muted small text-center py-3 border-top">© 2025 bankphan</div>
      </div>
    </div>
  );
};

export default Sidebar;