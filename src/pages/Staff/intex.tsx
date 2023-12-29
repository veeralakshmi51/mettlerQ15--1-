import React, { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import './staff.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStaff } from '../../slices/thunk';
import { useNavigate } from 'react-router-dom';

const Staff = () => {
    const dispatch = useDispatch<any>();
    const { staffData, currentPage, totalItems } = useSelector(
      (state: any) => state.Staff
    );
    const navigate = useNavigate()
    const itemsPerPage = 8;
  
    useEffect(() => {
      getAllStaff(dispatch, currentPage, itemsPerPage);
    }, [dispatch, currentPage, itemsPerPage]);
  
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const handlePageChange = (newPage: number) => {
      getAllStaff(dispatch, newPage, itemsPerPage);
    };
  return (
    <div className="table-container">
      <div className="heading1">
        <h4>All Staff List</h4>
        <div className="mx-2">
          <FaPlus
            data-bs-target="#exampleModal"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/staff-register')}
          />
        </div>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Staff ID</th>
            <th scope="col">Staff Name</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">SSN</th>
            <th scope="col">Job Title</th>
            <th scope="col">Role</th>
            <th scope="col">Start Date</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((staff:any) => (
            
            <tr key={staff.id}>
              <td>{staff.id}</td>
              <td>{staff.name[0].given} {staff.name[0].family}</td>
              <td>{staff.dateofBirth}</td> 
              <td>{staff.ssn}</td>
              <td>{staff.userType}</td>
              <td>{staff.role}</td>
              <td>{staff.employeeDetails[0].startDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <span>Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Staff;

