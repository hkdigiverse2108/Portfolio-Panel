import { Box } from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Mutations, Queries } from "../../Api";
import { AdvancedSearch, CommonActionColumn, CommonBreadcrumbs, CommonDataGrid, CommonDeleteModal } from "../../Components/Common";
import { CommonObjectPropertyColumn } from "../../Components/Common/CommonDataGrid/CommonColumns";
import { PAGE_TITLE, ROUTES } from "../../Constants";
import { BREADCRUMBS } from "../../Data";
import type { AppGridColDef, OurServiceBase } from "../../Types";
import { CreateFilter, GenerateOptions } from "../../Utils";
import { useDataGrid } from "../../Utils/Hooks";

const OurService = () => {
  const { paginationModel, setPaginationModel, sortModel, setSortModel, filterModel, setFilterModel, rowToDelete, setRowToDelete, isActive, setActive, advancedFilter, updateAdvancedFilter, params } = useDataGrid();
  const navigate = useNavigate();

  const { data: ourServiceData, isLoading: ourServiceDataLoading, isFetching: ourServiceDataFetching } = Queries.useGetOurService(params);
  const { data: serviceData, isLoading: serviceDataLoading } = Queries.useGetService({ activeFilter: true });

  const { mutate: editOurService, isPending: isEditLoading } = Mutations.useEditOurService();
  const { mutate: deleteOurServiceMutate, isPending: isDeleteLoading } = Mutations.useDeleteOurService();

  const allOurService = useMemo(() => ourServiceData?.data?.ourService_data.map((emp) => ({ ...emp, id: emp?._id, removeQty: null })) || [], [ourServiceData]);
  const totalRows = ourServiceData?.data?.totalData || 0;

  const handleAdd = () => navigate(ROUTES.OUR_SERVICE.ADD_EDIT);

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteOurServiceMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const columns: AppGridColDef<OurServiceBase>[] = [
    { field: "priority", headerName: "priority", width: 80 },
    CommonObjectPropertyColumn<OurServiceBase>("thumbnailImage", "thumbnailImage", [], { headerName: "Thumbnail Image", width: 150, type: "image" }),
    { field: "title", headerName: "title", flex: 1, minWidth: 200 },
    { field: "tagLine", headerName: "tagLine", flex: 1, minWidth: 150 },
    CommonActionColumn<OurServiceBase>({
      active: (row) => editOurService({ ourServiceId: row?._id, isActive: !row.isActive }),
      editRoute: ROUTES.OUR_SERVICE.ADD_EDIT,
      onDelete: (row) => setRowToDelete({ _id: row?._id, title: row?.title }),
    }),
  ];

  const CommonDataGridOption = {
    columns,
    rows: allOurService,
    rowCount: totalRows,
    loading: ourServiceDataLoading || ourServiceDataFetching || isEditLoading,
    isActive,
    setActive,
    handleAdd,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    sortModel,
    onSortModelChange: setSortModel,
    filterModel,
    onFilterModelChange: setFilterModel,
    fileName: PAGE_TITLE.OUR_SERVICE.BASE,
    isExport: false,
  };

  const filter = [
    CreateFilter("Select Service", "serviceFilter", advancedFilter, updateAdvancedFilter, GenerateOptions(serviceData?.data?.service_data), serviceDataLoading, { xs: 12, sm: 6, md: 3 }), // categoryFilter
  ];

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.OUR_SERVICE.BASE} maxItems={1} breadcrumbs={BREADCRUMBS.OUR_SERVICE.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, display: "grid", gap: 2 }}>
        <AdvancedSearch filter={filter} />
        <CommonDataGrid {...CommonDataGridOption} />
        <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
      </Box>
    </>
  );
};

export default OurService;
