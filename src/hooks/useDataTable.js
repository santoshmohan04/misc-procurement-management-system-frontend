import { useState, useMemo } from "react";

/**
 * useDataTable – generic hook for search, sort, and pagination over a flat
 * array of objects.
 *
 * @param {Array}  rows         - The full data array.
 * @param {Array}  searchFields - Object keys to search across (string values).
 * @param {string} defaultSortKey - Initial sort key ('' = unsorted).
 * @param {number} defaultPageSize - Rows per page (default 10).
 * @returns {{
 *   search, setSearch,
 *   sortKey, sortDir, handleSort,
 *   page, setPage, pageSize, setPageSize,
 *   displayRows, totalPages
 * }}
 */
const useDataTable = (
  rows = [],
  searchFields = [],
  defaultSortKey = "",
  defaultPageSize = 10,
) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(defaultSortKey);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const filtered = useMemo(() => {
    if (!search) return rows;
    const lower = search.toLowerCase();
    return rows.filter((row) =>
      searchFields.some((field) =>
        String(row[field] ?? "").toLowerCase().includes(lower),
      ),
    );
  }, [rows, search, searchFields]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));

  const displayRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  // Reset to page 1 when search changes
  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  return {
    search,
    setSearch: handleSearch,
    sortKey,
    sortDir,
    handleSort,
    page,
    setPage,
    pageSize,
    setPageSize,
    displayRows,
    totalPages,
    totalCount: sorted.length,
  };
};

export default useDataTable;
