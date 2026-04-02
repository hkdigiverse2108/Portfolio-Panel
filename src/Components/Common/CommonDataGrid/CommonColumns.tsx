import type { GridValidRowModel } from "@mui/x-data-grid";
import type { AppGridColDef, ColumnFormatType, CommonObjectNameColumnOptions } from "../../../Types";
import { FormatCountryCode, FormatDate, FormatDateTime, FormatPayment } from "../../../Utils";

const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

const formatValues = (values: (string | number)[], type?: ColumnFormatType): string => {
  if (!values.length) return "-";

  const value = values[0]; // for date types we use first value

  switch (type) {
    case "phone": {
      const [code, number] = values;
      if (!code || !number) return "-";
      return `${FormatCountryCode(code.toString())} ${number}`;
    }

    case "date":
      return value ? FormatDate(value) : "-";

    case "datetime":
      return value ? FormatDateTime(value) : "-";

    case "format":
      return value ? FormatPayment(value.toString()) : "-";

    case "status":
      return value ? FormatPayment(value.toString()) : "-";

    case "image": {
      const img = Array.isArray(value) ? value[0] : value;

      return typeof img === "string" ? img : "-";
    }

    default:
      return values.join(" ");
  }
};

export const CommonObjectPropertyColumn = <T extends GridValidRowModel>(field: string, sourceField: string, properties: string[], options?: CommonObjectNameColumnOptions): AppGridColDef<T> => ({
  field,
  headerName: options?.headerName ?? field,
  width: options?.width,
  flex: options?.flex,
  minWidth: options?.minWidth,
  
  valueGetter: (_value, row: any): any => {
    const obj = getNestedValue(row, sourceField);

    // ✅ STRING / NUMBER (date, thumbnail, etc.)
    if (typeof obj === "string" || typeof obj === "number") {
      return formatValues([obj], options?.type); // 👈 FIX
    }

    // ✅ ARRAY (images)
    if (Array.isArray(obj)) {
      return obj.length > 0 ? obj[0] : null;
    }

    // ✅ OBJECT
    if (typeof obj === "object" && obj !== null) {
      if (!properties.length) return obj;

      const values = properties.map((prop) => obj?.[prop]).filter((val) => typeof val === "string" || typeof val === "number");

      return formatValues(values, options?.type);
    }

    return null;
  },

  renderCell: ({ value }) => {
    if (options?.type === "image") {
      return value ? <img src={value} alt="img" style={{ width: 50, height: 50, objectFit: "contain", borderRadius: 4 }} /> : "-";
    }
    if (options?.type === "status") {
      const formatted = value?.toString().toLowerCase().replace(/\s/g, "_") || "";
      return <span className={`status-${formatted}`}>{value}</span>;
    }

    return String(value ?? "-");
  },

  exportFormatter: (_value, row: any) => {
    const obj = getNestedValue(row, sourceField);

    // ✅ HANDLE direct value
    if (typeof obj === "string" || typeof obj === "number") {
      return formatValues([obj], options?.type);
    }

    if (typeof obj !== "object" || obj === null) return "-";

    const values = properties.map((prop) => obj?.[prop]).filter((val) => typeof val === "string" || typeof val === "number");

    return formatValues(values, options?.type);
  },
});
