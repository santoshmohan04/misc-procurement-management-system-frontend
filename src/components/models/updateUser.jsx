import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import orderRequest from "../../api/Order/order.request";
import userRequest from "../../api/User/user.request";
import supplierRequest from "../../api/Supplier/supplier.request";

const UpdateUser = ({ user }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [role, setrole] = useState("");
  const [supplier, setsupplier] = useState("");
  const [allsuppliers, setAllSuppliers] = useState([]);

  useEffect(() => {
    supplierRequest.getSuppliers().then((res) => {
      console.log(res.data);
      setAllSuppliers(res.data);
    });
  }, []);

  const fetchUsers = () => {
    userRequest.getAllUsers().then((res) => {
      console.log(res.data);
      setusers(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "SUPPLIER") {
      userRequest
        .updateUser(
          {
            role,
            supplier,
          },
          user._id,
        )
        .then((res) => {
          console.log(res);
          toast.success("User role updated successfully!");
          fetchUsers();
        })
        .catch((err) => {
          toast.error("Something went wrong. Please try again.");
        });
    } else {
      userRequest
        .updateUser(
          {
            role,
          },
          user._id,
        )
        .then((res) => {
          console.log(res);
          toast.success("User role updated successfully!");

          fetchUsers();
        })
        .catch((err) => {
          toast.error("Something went wrong. Please try again.");
        });
    }
  };

  return (
    <>
      <div
        className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
        onClick={() => setShowModal(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div>
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Update User Role</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}>
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className="flex items-center justify-center p-12">
                  <div className="w-full px-3 " style={{ width: "500px" }}>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label
                          htmlFor="guest"
                          className="mb-3 block text-base font-medium text-[#07074D]">
                          Change Role
                        </label>
                        <select
                          id="countries"
                          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          onChange={(e) => setrole(e.target.value)}>
                          <option value="Select">Select </option>
                          <option value="SITEMANAGER">SITEMANAGER</option>
                          <option value="PROCUREMENTSTAFF">
                            PROCUREMENTSTAFF
                          </option>
                          <option value="SENIORSTAFF">SENIORSTAFF</option>
                          <option value="ADMIN">ADMIN</option>
                          <option value="SUPPLIER">SUPPLIER</option>
                        </select>
                      </div>
                      {role === "SUPPLIER" && (
                        <>
                          <div className="mb-3">
                            <label
                              htmlFor="guest"
                              className="mb-3 block text-base font-medium text-[#07074D]">
                              Select Supplier
                            </label>
                            <select
                              id="countries"
                              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                              onChange={(e) => setsupplier(e.target.value)}>
                              <option selected>select supplier</option>
                              {!allsuppliers.length ? (
                                <option value="none">
                                  No Supplier ID's Available
                                </option>
                              ) : (
                                allsuppliers.map((supplier) => (
                                  <option
                                    value={supplier._id}
                                    key={supplier._id}>
                                    {supplier._id}
                                  </option>
                                ))
                              )}
                            </select>
                          </div>
                        </>
                      )}

                      <div className="flex">
                        <button
                          className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                          type="submit">
                          Submit
                        </button>

                        <button
                          className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none ml-2"
                          onClick={() => setShowModal(false)}>
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default UpdateUser;
