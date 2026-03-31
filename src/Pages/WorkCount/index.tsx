import { Box } from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Mutations, Queries } from "../../Api";
import { CommonActionColumn, CommonBreadcrumbs, CommonCard, CommonDataGrid, CommonDeleteModal } from "../../Components/Common";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data";
import { setWorkCountModal } from "../../Store/Slices/ModalSlice";
import type { AppGridColDef, WorkCountBase } from "../../Types";
import { useDataGrid } from "../../Utils/Hooks";
import WorkCountForm from "./WorkCountForm";

const WorkCount = () => {
  const { paginationModel, setPaginationModel, sortModel, setSortModel, filterModel, setFilterModel, rowToDelete, setRowToDelete, isActive, setActive, params } = useDataGrid();
  const dispatch = useDispatch();
  const { data: WorkCountData, isLoading: WorkCountDataLoading, isFetching: WorkCountDataFetching } = Queries.useGetWorkCount(params);

  const { mutate: deleteWorkCountMutate } = Mutations.useDeleteWorkCount();
  const { mutate: editWorkCount, isPending: isEditLoading } = Mutations.useEditWorkCount();

  const allWorkCount = useMemo(() => WorkCountData?.data?.workCount_data.map((item) => ({ ...item, id: item?._id })) || [], [WorkCountData]);
  const totalRows = WorkCountData?.data?.totalData || 0;

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteWorkCountMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const handleAdd = () => dispatch(setWorkCountModal({ open: true, data: null }));

  const handleEdit = (row: WorkCountBase) => dispatch(setWorkCountModal({ open: true, data: row }));

  const columns: AppGridColDef<WorkCountBase>[] = [
    { field: "title", headerName: "Title", flex: 1, minWidth: 300 },
    { field: "number", headerName: "Number", flex: 1, minWidth: 300 },
    CommonActionColumn<WorkCountBase>({
      active: (row) => editWorkCount({ workCountId: row?._id, isActive: !row.isActive }),
      onEdit: { handleEdit: (row) => handleEdit(row) },
      onDelete: (row) => setRowToDelete({ _id: row?._id, title: row?.title }),
    }),
  ];

  const CommonDataGridOption = {
    columns,
    rows: allWorkCount,
    rowCount: totalRows,
    loading: WorkCountDataLoading || WorkCountDataFetching || isEditLoading,
    isActive,
    setActive,
    handleAdd,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    sortModel,
    onSortModelChange: setSortModel,
    filterModel,
    onFilterModelChange: setFilterModel,
    fileName: PAGE_TITLE.WORK_COUNT.BASE,
    isExport: false,
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.WORK_COUNT.BASE} maxItems={1} breadcrumbs={BREADCRUMBS.WORK_COUNT.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, display: "grid", gap: 2 }}>
        <CommonCard hideDivider>
          <CommonDataGrid {...CommonDataGridOption} />
        </CommonCard>
        <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
        <WorkCountForm />
      </Box>
    </>
  );
};

export default WorkCount;
