import React from "react";

/**
 * PurchaseOrderForm – pure presentational form for creating a purchase order.
 * All state is managed externally; this component only renders and fires callbacks.
 */
const PurchaseOrderForm = ({
  orderType,
  itemName,
  measuringUnit,
  quantity,
  description,
  supplierID,
  requiredDate,
  suppliers,
  isSubmitting,
  onOrderTypeChange,
  onItemNameChange,
  onMeasuringUnitChange,
  onQuantityChange,
  onDescriptionChange,
  onSupplierIDChange,
  onRequiredDateChange,
  onSubmit,
}) => {
  const inputClass =
    "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  const selectClass =
    "form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <form onSubmit={onSubmit}>
      <div className="flex justify-center">
        <div className="mb-3" style={{ width: "600px" }}>
          <label className="form-label inline-block mb-2 text-gray-700">
            Order Type
          </label>
          <select
            className={selectClass}
            value={orderType}
            onChange={(e) => onOrderTypeChange(e.target.value)}>
            <option value="">select</option>
            <option value="Delivery">Delivery</option>
            <option value="Manufacture">Manufacture</option>
            <option value="Retail">Retail</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="mb-3" style={{ width: "600px" }}>
          <label className="form-label inline-block mb-2 text-gray-700">
            Item Name
          </label>
          <input
            type="text"
            className={inputClass}
            placeholder="Enter Item Name"
            value={itemName}
            onChange={(e) => onItemNameChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="mb-3" style={{ width: "600px" }}>
          <label className="form-label inline-block mb-2 text-gray-700">
            Measuring Unit
          </label>
          <select
            className={selectClass}
            value={measuringUnit}
            onChange={(e) => onMeasuringUnitChange(e.target.value)}>
            <option value="">select</option>
            <option value="Kg">Kilogram(Kg)</option>
            <option value="g">gram(g)</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="mb-3" style={{ width: "600px" }}>
          <label className="form-label inline-block mb-2 text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(e) => onQuantityChange(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
          Description
        </label>
        <textarea
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter a Description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <div className="mb-3" style={{ width: "600px" }}>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Supplier
          </label>
          <select
            className={selectClass}
            value={supplierID}
            onChange={(e) => onSupplierIDChange(e.target.value)}>
            <option value="">Open this select menu</option>
            {!suppliers.length ? (
              <option value="none">No Supplier ID&apos;s Available</option>
            ) : (
              suppliers.map((supplier) => (
                <option value={supplier._id} key={supplier._id}>
                  {supplier._id}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      <div className="relative">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
          Order Required Date
        </label>
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select date"
          value={requiredDate}
          onChange={(e) => onRequiredDateChange(e.target.value)}
        />
      </div>

      <div style={{ paddingTop: "30px" }}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-50">
          Purchase Order
        </button>
      </div>
    </form>
  );
};

export default React.memo(PurchaseOrderForm);
