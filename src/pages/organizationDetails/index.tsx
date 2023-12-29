import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrganizationDetails,updateOrganizationDetails } from "../../slices/organizationDetails/thunk";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface FormData {
  organizationName: string;
  email: string;
  mobileNumber: string;
  websiteUrl: string;
  hippaPrivacyOfficer: string;
}

const Organization: React.FC = () => {
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null);

  const dispatch = useDispatch<any>();
  const { organizationDetails } = useSelector(
    (state: any) => state.Organization
  );

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(organizationDetails.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const records = organizationDetails.slice(firstIndex, lastIndex);
  const numbers = [...Array(totalPages).keys()].map((num) => num + 1);
  const [editModal, setEditModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    organizationName: "",
    email: "",
    mobileNumber: "",
    websiteUrl: "",
    hippaPrivacyOfficer: "",
  });

  useEffect(() => {
    dispatch(getAllOrganizationDetails());
  }, [dispatch]);

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changecurrentpage(page: number) {
    setCurrentPage(page);
  }

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const handleSaveChanges=()=>{
    if (!selectedOrganizationId) {
      return;
    }
    dispatch(updateOrganizationDetails(selectedOrganizationId, formData));
    setEditModal(false);
  }

  const handleClick = (organization: any) => {
    const organizationId = organization.organizationdetails[0]?.id || "";
    setSelectedOrganizationId(organizationId);
    setFormData({
      organizationName: organization.organizationdetails[0]?.name || "",
      email: organization.email || "",
      mobileNumber: organization.mobileNumber || "",
      websiteUrl: organization.websiteUrl || "",
      hippaPrivacyOfficer: organization.hippaprivacyofficer[0]?.name || "",
    });
    setEditModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="mt-3 col-md-12">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Organization Details</h2>
            <Link to="/organization-form">
              <button className="btn btn-info">+ </button>
            </Link>
          </div>
          <hr></hr>
          <br></br>
          <nav className="d-flex justify-content-end">
            <ul className="pagination">
              <li className="page-item">
                <a href="#" className="page-link" onClick={prevPage}>
                  Prev
                </a>
              </li>
              {numbers.map((num, index) => (
                <li key={index} className="page-item">
                  <a
                    href="#"
                    className={`page-link ${
                      currentPage === num ? "active" : ""
                    }`}
                    onClick={() => changecurrentpage(num)}
                  >
                    {num}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a href="#" className="page-link" onClick={nextPage}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
          <br></br>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Organization Name</th>
                <th scope="col">Organization Type</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile Number</th>
                <th scope="col">Website URL</th>
                <th scope="col">Hippa Privacy Officer Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((organization: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClick(organization)}
                  >
                    {organization.organizationdetails[0]?.name || ""}
                  </td>
                  <td>{organization.organizationdetails[0]?.type || ""}</td>
                  <td>{organization.email || ""}</td>
                  <td>{organization.mobileNumber || ""}</td>
                  <td>{organization.websiteUrl || ""}</td>
                  <td>
                    {organization.hippaprivacyofficer.length > 0
                      ? organization.hippaprivacyofficer[0]?.name || ""
                      : ""}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {/* handleDelete() */}}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal isOpen={editModal} toggle={() => setEditModal(false)} centered>
            <ModalHeader toggle={() => setEditModal(false)}>
              Organization Details
            </ModalHeader>
            <ModalBody>
              <div>
                <div className="form-control">
                  <label htmlFor="organizationName" className="floating-label">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    name="organizationName"
                    placeholder="Enter Organization Name"
                    value={formData.organizationName}
                    onChange={handleChange}
                  />
                  <label htmlFor="email" className="floating-label">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    readOnly
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="mobileNumber" className="floating-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    placeholder="Enter Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                  <label htmlFor="websiteUrl" className="floating-label">
                    Website URL
                  </label>
                  <input
                    type="text"
                    id="websiteUrl"
                    name="websiteUrl"
                    placeholder="Enter Website URL"
                    value={formData.websiteUrl}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="hippaPrivacyOfficer"
                    className="floating-label"
                  >
                    Hippa Privacy Officer Name
                  </label>
                  <input
                    type="text"
                    id="hippaPrivacyOfficer"
                    name="hippaPrivacyOfficer"
                    placeholder="Enter Privacy Officer Name"
                    value={formData.hippaPrivacyOfficer}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={() => {handleSaveChanges}}>
                Save Changes
              </Button>{" "}
              <Button color="danger" onClick={() => setEditModal(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Organization;
