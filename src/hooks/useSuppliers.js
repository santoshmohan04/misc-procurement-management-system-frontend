import { useMemo } from "react";
import { useGetSuppliersQuery } from "../store/procurementApi";

/**
 * useSuppliers – lightweight wrapper around the RTK Query suppliers endpoint.
 * Returns a stable array so consumers can safely use it as a dependency.
 */
const useSuppliers = () => {
  const { data, isLoading, isError } = useGetSuppliersQuery();
  const suppliers = useMemo(
    () => (Array.isArray(data?.data) ? data.data : data || []),
    [data],
  );
  return { suppliers, isLoading, isError };
};

export default useSuppliers;
