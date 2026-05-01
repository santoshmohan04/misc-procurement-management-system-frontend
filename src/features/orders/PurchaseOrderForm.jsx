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
    "block w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none";

  const selectClass =
    "block w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none";

  const labelClass = "block mb-1 text-sm font-medium text-gray-700";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Order Type</label>
        <select
          className={selectClass}
          value={orderType}
          onChange={(e) => onOrderTypeChange(e.target.value)}>
          <option value="">Select</option>
          <option value="Delivery">Delivery</option>
          <option value="Manufacture">Manufacture</option>
          <option value="Retail">Retail</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Item Name</label>
        <input
          type="text"
          className={inputClass}
          placeholder="Enter Item Name"
          value={itemName}
          onChange={(e) => onItemNameChange(e.target.value)}
        />
      </div>

      <div>
        <label className={labelClass}>Measuring Unit</label>
        <select
          className={selectClass}
          value={measuringUnit}
          onChange={(e) => onMeasuringUnitChange(e.target.value)}>
          <option value="">Select</option>
          <option value="Kg">Kilogram (Kg)</option>
          <option value="g">gram (g)</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Quantity</label>
        <input
          type="number"
          className={inputClass}
          placeholder="Enter Quantity"
          value={quantity}
          onChange={(e) => onQuantityChange(e.target.value)}
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          rows="4"
          className="block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
          placeholder="Enter a Description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>

      <div>
        <label className={labelClass}>Supplier</label>
        <select
          className={selectClass}
          value={supplierID}
          onChange={(e) => onSupplierIDChange(e.target.value)}>
          <option value="">Select a Supplier</option>
          {!suppliers.length ? (
            <option value="none">No Supplier IDs Available</option>
          ) : (
            suppliers.map((supplier) => (
              <option value={supplier._id} key={supplier._id}>
                {supplier._id}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="relative">
        <label className={labelClass}>Order Required Date</label>
        <div className="flex absolute inset-y-0 left-0 items-end pb-2 pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="date"
          className="block w-full pl-10 px-3 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
          value={requiredDate}
          onChange={(e) => onRequiredDateChange(e.target.value)}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded shadow hover:bg-blue-700 transition disabled:opacity-50">
          Purchase Order
        </button>
      </div>
    </form>
  );
};

export default React.memo(PurchaseOrderForm);
