import { Box } from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Mutations, Queries } from "../../Api";
import { CommonActionColumn, CommonBreadcrumbs, CommonCard, CommonDataGrid, CommonDeleteModal } from "../../Components/Common";
import { CommonObjectPropertyColumn } from "../../Components/Common/CommonDataGrid/CommonColumns";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data";
import { setMyAchievementModal } from "../../Store/Slices/ModalSlice";
import type { AppGridColDef, MyAchievementBase } from "../../Types";
import { useDataGrid } from "../../Utils/Hooks";
import MyAchievementForm from "./MyAchievementForm";

const MyAchievement = () => {
  const { paginationModel, setPaginationModel, sortModel, setSortModel, filterModel, setFilterModel, rowToDelete, setRowToDelete, isActive, setActive, params } = useDataGrid();
  const dispatch = useDispatch();

  const { data: MyAchievementData, isLoading: MyAchievementDataLoading, isFetching: MyAchievementDataFetching } = Queries.useGetMyAchievement(params);
  const { mutate: deleteMyAchievementMutate, isPending: isDeleteLoading } = Mutations.useDeleteMyAchievement();
  const { mutate: editMyAchievement, isPending: isEditLoading } = Mutations.useEditMyAchievement();

  const allMyAchievements = useMemo(() => MyAchievementData?.data?.myAchievement_data.map((item) => ({ ...item, id: item?._id })) || [], [MyAchievementData]);
  const totalRows = MyAchievementData?.data?.totalData || 0;

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteMyAchievementMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const handleAdd = () => dispatch(setMyAchievementModal({ open: true, data: null }));

  const handleEdit = (row: MyAchievementBase) => dispatch(setMyAchievementModal({ open: true, data: row }));

  const columns: AppGridColDef<MyAchievementBase>[] = [
    CommonObjectPropertyColumn<MyAchievementBase>("image", "image", [], { headerName: "Image", flex: 1, minWidth: 200, type: "image" }),
    { field: "title", headerName: "Title", flex: 1, minWidth: 200 },
    { field: "link", headerName: "Link", flex: 1, minWidth: 200 },
    { field: "btnTitle", headerName: "Button Title", flex: 1, minWidth: 200 },
    { field: "btnLink", headerName: "Button Link", flex: 1, minWidth: 200 },
    CommonActionColumn<MyAchievementBase>({
      active: (row) => editMyAchievement({ myAchievementId: row?._id, isActive: !row.isActive }),
      onEdit: { handleEdit: (row) => handleEdit(row) },
      onDelete: (row) => setRowToDelete({ _id: row?._id, title: row?.title }),
    }),
  ];

  const CommonDataGridOption = {
    columns,
    rows: allMyAchievements,
    rowCount: totalRows,
    loading: MyAchievementDataLoading || MyAchievementDataFetching || isEditLoading,
    isActive,
    setActive,
    handleAdd,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    sortModel,
    onSortModelChange: setSortModel,
    filterModel,
    onFilterModelChange: setFilterModel,
    fileName: PAGE_TITLE.MY_ACHIEVEMENT.BASE,
    isExport: false,
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.MY_ACHIEVEMENT.BASE} maxItems={1} breadcrumbs={BREADCRUMBS.MY_ACHIEVEMENT.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, display: "grid" }}>
        <CommonCard hideDivider>
          <CommonDataGrid {...CommonDataGridOption} />
        </CommonCard>
        <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
        <MyAchievementForm />
      </Box>
    </>
  );
};

export default MyAchievement;
