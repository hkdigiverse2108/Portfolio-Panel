import { Box } from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Mutations, Queries } from "../../Api";
import { CommonActionColumn, CommonBreadcrumbs, CommonCard, CommonDataGrid, CommonDeleteModal } from "../../Components/Common";
import { CommonObjectPropertyColumn } from "../../Components/Common/CommonDataGrid/CommonColumns";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data";
import { setAwardsModal } from "../../Store/Slices/ModalSlice";
import type { AppGridColDef, AwardsBase } from "../../Types";
import { useDataGrid } from "../../Utils/Hooks";
import AwardsForm from "./AwardsForm";

const Awards = () => {
  const { paginationModel, setPaginationModel, sortModel, setSortModel, filterModel, setFilterModel, rowToDelete, setRowToDelete, isActive, setActive, params } = useDataGrid();
  const dispatch = useDispatch();

  const { data: AwardsData, isLoading: AwardsDataLoading, isFetching: AwardsDataFetching } = Queries.useGetAwards(params);
  const { mutate: deleteAwardsMutate, isPending: isDeleteLoading } = Mutations.useDeleteAwards();
  const { mutate: editAwards, isPending: isEditLoading } = Mutations.useEditAwards();

  const allAwards = useMemo(() => AwardsData?.data?.awards_data.map((item) => ({ ...item, id: item?._id })) || [], [AwardsData]);
  const totalRows = AwardsData?.data?.totalData || 0;

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteAwardsMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const handleAdd = () => dispatch(setAwardsModal({ open: true, data: null }));

  const handleEdit = (row: AwardsBase) => dispatch(setAwardsModal({ open: true, data: row }));

  const columns: AppGridColDef<AwardsBase>[] = [
    CommonObjectPropertyColumn<AwardsBase>("image", "image", [], { headerName: "Image", flex: 1, minWidth: 200, type: "image" }),
    CommonObjectPropertyColumn<AwardsBase>("iconImage", "iconImage", [], { headerName: "Icon Image", flex: 1, minWidth: 200, type: "image" }),
    { field: "title", headerName: "Title", flex: 1, minWidth: 200 },
    CommonObjectPropertyColumn<AwardsBase>("date", "date", [], { headerName: "Date", flex: 1, minWidth: 200, type: "date" }),
    CommonActionColumn<AwardsBase>({
      active: (row) => editAwards({ awardsId: row?._id, isActive: !row.isActive }),
      onEdit: { handleEdit: (row) => handleEdit(row) },
      onDelete: (row) => setRowToDelete({ _id: row?._id, title: row?.title }),
    }),
  ];

  const CommonDataGridOption = {
    columns,
    rows: allAwards,
    rowCount: totalRows,
    loading: AwardsDataLoading || AwardsDataFetching || isEditLoading,
    isActive,
    setActive,
    handleAdd,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    sortModel,
    onSortModelChange: setSortModel,
    filterModel,
    onFilterModelChange: setFilterModel,
    fileName: PAGE_TITLE.AWARDS.BASE,
    isExport: false,
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.AWARDS.BASE} maxItems={1} breadcrumbs={BREADCRUMBS.AWARDS.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, display: "grid" }}>
        <CommonCard hideDivider>
          <CommonDataGrid {...CommonDataGridOption} />
        </CommonCard>
        <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
        <AwardsForm />
      </Box>
    </>
  );
};

export default Awards;
