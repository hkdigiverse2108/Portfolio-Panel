import dayjs from "dayjs";
import { STORAGE_KEYS } from "../Constants";
import { Storage } from "./index";

export const getCompanyDateFormat = () => {
  const StoredCompany = JSON.parse(Storage.getItem(STORAGE_KEYS.COMPANY) || "null");
  return StoredCompany?.printDateFormat || "DD/MM/YYYY";
};

export const FormatDate = (dateInput: Date): string => {
  const format = getCompanyDateFormat();

  return dateInput && dayjs(dateInput).isValid() ? dayjs(dateInput).format(format) : "-";
};

export const FormatTime = (dateInput: Date): string => {
  return dayjs(dateInput).isValid() ? dayjs(dateInput).format("hh:mm A") : "";
};

export const FormatDateTime = (dateInput: Date): string => {
  const format = getCompanyDateFormat();

  return dayjs(dateInput).isValid() ? dayjs(dateInput).format(`${format} hh:mm A`) : "";
};
