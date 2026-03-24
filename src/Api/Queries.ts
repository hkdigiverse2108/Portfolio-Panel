import { KEYS, URL_KEYS } from "../Constants";
import type { Params, PermissionChildApiResponse, PermissionDetailsApiResponse } from "../Types";
import { Get } from "./Methods";
import { useQueries } from "./ReactQuery";

export const Queries = {
  //*************** Permission **************** */
  useGetPermissionDetails: (params?: Params, enabled?: boolean) => useQueries<PermissionDetailsApiResponse>([KEYS.PERMISSION.DETAILS, params], () => Get(URL_KEYS.PERMISSION.DETAILS, params), { enabled: enabled }),
  useGetPermissionChildDetails: (params?: Params, enabled?: boolean) => useQueries<PermissionChildApiResponse>([KEYS.PERMISSION.DETAILS, params], () => Get(URL_KEYS.PERMISSION.CHILD, params), { enabled: enabled }),
};
