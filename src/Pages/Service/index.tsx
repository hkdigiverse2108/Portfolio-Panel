import { Box } from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Mutations, Queries } from "../../Api";
import { CommonActionColumn, CommonBreadcrumbs, CommonCard, CommonDataGrid, CommonDeleteModal } from "../../Components/Common";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data";
import { setServiceModal } from "../../Store/Slices/ModalSlice";
import type { AppGridColDef, ServiceBase } from "../../Types";
import { useDataGrid } from "../../Utils/Hooks";
import ServiceForm from "./ServiceForm";

const Service = () => {
  const { paginationModel, setPaginationModel, sortModel, setSortModel, filterModel, setFilterModel, rowToDelete, setRowToDelete, isActive, setActive, params } = useDataGrid();
  const dispatch = useDispatch();
  const { data: ServiceData, isLoading: ServiceDataLoading, isFetching: ServiceDataFetching } = Queries.useGetService(params);

  const { mutate: deleteServiceMutate , isPending: isDeleteLoading} = Mutations.useDeleteService();
  const { mutate: editService, isPending: isEditLoading } = Mutations.useEditService();

  const allService = useMemo(() => ServiceData?.data?.service_data.map((item) => ({ ...item, id: item?._id })) || [], [ServiceData]);
  const totalRows = ServiceData?.data?.totalData || 0;

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteServiceMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const handleAdd = () => dispatch(setServiceModal({ open: true, data: null }));

  const handleEdit = (row: ServiceBase) => dispatch(setServiceModal({ open: true, data: row }));

  const columns: AppGridColDef<ServiceBase>[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 300 },
    CommonActionColumn<ServiceBase>({
      active: (row) => editService({ serviceId: row?._id, isActive: !row.isActive }),
      onEdit: { handleEdit: (row) => handleEdit(row) },
      onDelete: (row) => setRowToDelete({ _id: row?._id, title: row?.name }),
    }),
  ];

  const CommonDataGridOption = {
    columns,
    rows: allService,
    rowCount: totalRows,
    loading: ServiceDataLoading || ServiceDataFetching || isEditLoading,
    isActive,
    setActive,
    handleAdd,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    sortModel,
    onSortModelChange: setSortModel,
    filterModel,
    onFilterModelChange: setFilterModel,
    fileName: PAGE_TITLE.SERVICE.BASE,
    isExport: false,
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.SERVICE.BASE} maxItems={1} breadcrumbs={BREADCRUMBS.SERVICE.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, display: "grid", gap: 2 }}>
        <CommonCard hideDivider>
          <CommonDataGrid {...CommonDataGridOption} />
        </CommonCard>
        <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
        <ServiceForm />
      </Box>
    </>
  );
};

export default Service;
