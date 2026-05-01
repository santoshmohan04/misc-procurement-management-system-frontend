import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { toast } from "sonner";

import userRequest from "../api/User/user.request";
import { storage } from "../firebase";
import { setUser } from "../store/User";
import { SUCCESS } from "../constants";

export const Modal = ({ isVisible, toggle, data = null, onUpdate }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    url: "",
  });

  const updateUserData = async (e) => {
    e.preventDefault();
    const response = await userRequest.updateUser(
      userData,
      data?._id || user?.id,
    );
    if (response?.status === SUCCESS && response?.data) {
      if (!data) dispatch(setUser(response.data));
      if (data) onUpdate();
      toggle();
    } else {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const uploadFile = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `${file?.name}${new Date().getTime()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        console.log(prog);
      },
      (error) =>
        toast.error("File upload failed. Please try again later."),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUserData((values) => ({ ...values, ["url"]: downloadURL }));
        });
      },
    );
  };

  const onChangeHandle = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData((values) => ({ ...values, [name]: value }));
  };

  const imageHandle = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    const file = e.target.files?.[0];

    uploadFile(file);
  };

  useEffect(() => {
    if (data) {
      setUserData({
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        mobile: data?.mobile,
        address: data?.address,
        url: data?.url,
      });
    } else {
      setUserData({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        mobile: user?.mobile,
        address: user?.address,
        url: user?.url,
      });
    }
  }, [data, user]);

  return (
    <div
      className={`relative z-20 ${isVisible ? "visible" : "hidden"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">
      <div className="fixed inset-0 backdrop-blur-2xl"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-slate-50 text-left transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <form onSubmit={updateUserData}>
              <div className="sm:overflow-hidden sm:rounded-md border-2 border-solid border-black/5">
                <div className="flex flex-col gap-1 px-4 py-4 sm:p-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Photo
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="flex justify-center items-center h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        {userData?.url ? (
                          <img
                            className="rounded-full object-cover"
                            src={userData.url}
                            alt="M"
                          />
                        ) : (
                          <span className="text-xl text-slate-300 font-semibold">
                            {userData.firstName?.charAt(0)}
                          </span>
                        )}
                      </span>
                      <input
                        type="file"
                        onChange={imageHandle}
                        className="ml-5 rounded-md border-2 border-gray-200 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="col-span-3 sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <div className="mt-1 flex">
                        <input
                          type="text"
                          name="firstName"
                          className="block w-full flex-1 rounded-md border-2 px-2 py-1 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="First name"
                          value={userData?.firstName || ""}
                          required
                          onChange={onChangeHandle}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="col-span-3 sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <div className="mt-1 flex">
                        <input
                          type="text"
                          name="lastName"
                          className="block w-full flex-1 rounded-md border-2 px-2 py-1 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="Last name"
                          value={userData?.lastName || ""}
                          required
                          onChange={onChangeHandle}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="col-span-3 sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="mt-1 flex">
                        <input
                          type="email"
                          name="email"
                          className="block w-full flex-1 rounded-md border-2 px-2 py-1 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="Email"
                          value={userData?.email || ""}
                          required
                          onChange={onChangeHandle}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="col-span-3 sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Mobile
                      </label>
                      <div className="mt-1 flex">
                        <input
                          type="text"
                          name="mobile"
                          className="block w-full flex-1 rounded-md border-2 px-2 py-1 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="Mobile"
                          value={userData?.mobile || ""}
                          onChange={onChangeHandle}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <div className="mt-1">
                      <textarea
                        name="address"
                        rows="3"
                        className="mt-1 block w-full rounded-md border-2 px-2 py-1 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Address"
                        value={userData?.address || ""}
                        onChange={onChangeHandle}></textarea>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggle();
                    }}
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
