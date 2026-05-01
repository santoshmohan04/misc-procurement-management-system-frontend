import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

import userRequest from "../api/User/user.request";
import useFetchUserProfile from "../hooks/useFetchUserProfile";

import Cover from "../assets/images/cover.jpg";
import { SUCCESS } from "../constants";

export const Register = () => {
  const [department, setDepartment] = useState(null);
  let navigate = useNavigate();
  const state = useSelector((state) => state.user);

  useFetchUserProfile();

  useEffect(() => {
    if (state.isLoggedIn) {
      navigate("/list");
    }
  }, [state.isLoggedIn]);

  const handleRegister = async (e) => {
    e.preventDefault();
    let role;
    switch (e.target.department.value) {
      case "PROCUREMENT":
        role = "PROCUREMENT";
        break;
      case "MANAGEMENT":
        role = "SENIOR";
        break;
      case "ONSITE":
        role = "SITE_MANAGER";
        break;
      case "OTHER":
        role = "SUPPLIER";
        break;
      default:
        role = null;
    }

    let data = {
      name: e.target.name.value,
      nic: e.target.nic.value,
      email: e.target.email.value,
      mobile: e.target.mobile.value,
      department: e.target.department.value,
      password: e.target.password.value,
      role: role,
    };

    if (department === "ONSITE")
      data = { ...data, siteName: e.target.siteName.value };

    const res = await userRequest.addUser(data);
    if (res?.status === SUCCESS) {
      toast.success("Registration successful! You can now log in.");
      navigate("/");
    } else {
      toast.error("Registration failed. Something went wrong. Please try again.");
    }
  };

  const handleDepartment = (e) => {
    setDepartment(e?.target?.value);
  };

  const inputs = [
    {
      type: "text",
      id: "name",
      name: "name",
      required: true,
      placeholder: "Name",
    },
    {
      type: "text",
      id: "nic",
      name: "nic",
      required: true,
      placeholder: "NIC",
    },
    {
      type: "email",
      id: "email",
      name: "email",
      required: true,
      placeholder: "Email",
    },
    {
      type: "text",
      id: "mobile",
      name: "mobile",
      required: true,
      placeholder: "Mobile",
    },
    {
      type: "select",
      id: "department",
      name: "department",
      required: true,
      placeholder: "Department",
      options: [
        { lable: "Procurement", value: "PROCUREMENT" },
        { lable: "Management", value: "MANAGEMENT" },
        { lable: "Onsite", value: "ONSITE" },
        { lable: "Other", value: "OTHER" },
      ],
    },
    {
      type: "password",
      id: "password",
      name: "password",
      required: true,
      placeholder: "Password",
    },
  ];

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full"
              src={Cover}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form className="w-full" onSubmit={handleRegister}>
              <h1 className="mb-4 text-xl text-center tracking-tight font-semibold text-black">
                <span className="font-normal">Welcome to</span>
                <br />
                The Procurement Management Portal
              </h1>
              <hr className="opacity-10 mb-4" />
              {inputs.map((i, key) =>
                i.type !== "select" ? (
                  <input
                    key={key}
                    className="mt-2 w-full border rounded py-1 px-3"
                    type={i.type}
                    id={i.id}
                    name={i.name}
                    required={i.required}
                    placeholder={i.placeholder}
                  />
                ) : (
                  <select
                    key={key}
                    name={i.name}
                    id={i.id}
                    className="mt-2 w-full border rounded py-1 px-2"
                    onChange={handleDepartment}>
                    {i.options.map((option, key) => (
                      <option key={key} value={option.value}>
                        {option.lable}
                      </option>
                    ))}
                  </select>
                ),
              )}
              {department === "ONSITE" && (
                <input
                  id="sitename"
                  className="mt-2 w-full border rounded py-1 px-3"
                  type="text"
                  name="siteName"
                  required
                  placeholder="Site Name"
                />
              )}

              <button className="mt-8 py-2 rounded text-white btn btn-active btn-primary w-full bg-black">
                Register
              </button>

              <p className="mt-4 text-center text-sm">
                Already have an account?
                {` `}
                <Link
                  className="text-sm font-medium text-purple-600 hover:underline"
                  to="/">
                  Login
                </Link>
              </p>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};
