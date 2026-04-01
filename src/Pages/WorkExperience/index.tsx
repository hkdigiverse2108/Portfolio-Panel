import { Box } from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Mutations, Queries } from "../../Api";
import { CommonActionColumn, CommonBreadcrumbs, CommonCard, CommonDataGrid, CommonDeleteModal } from "../../Components/Common";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data";
import type { AppGridColDef, WorkExperienceBase } from "../../Types";
import { useDataGrid } from "../../Utils/Hooks";
import WorkExperienceForm from "./WorkExperienceForm";
import { setWorkExperienceModal } from "../../Store/Slices/ModalSlice";

const WorkExperience = () => {
  const { paginationModel, setPaginationModel, sortModel, setSortModel, filterModel, setFilterModel, rowToDelete, setRowToDelete, isActive, setActive, params } = useDataGrid();
  const dispatch = useDispatch();
  const { data: WorkExperienceData, isLoading: WorkExperienceDataLoading, isFetching: WorkExperienceDataFetching } = Queries.useGetWorkExperience(params);

  const { mutate: deleteWorkExperienceMutate, isPending: isDeleteLoading } = Mutations.useDeleteWorkExperience();
  const { mutate: editWorkExperience, isPending: isEditLoading } = Mutations.useEditWorkExperience();

  const allWorkExperience = useMemo(() => WorkExperienceData?.data?.workExperience_data.map((item) => ({ ...item, id: item?._id })) || [], [WorkExperienceData]);
  const totalRows = WorkExperienceData?.data?.totalData || 0;

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteWorkExperienceMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const handleAdd = () => dispatch(setWorkExperienceModal({ open: true, data: null }));

  const handleEdit = (row: WorkExperienceBase) => dispatch(setWorkExperienceModal({ open: true, data: row }));

  const columns: AppGridColDef<WorkExperienceBase>[] = [
    { field: "year", headerName: "Year", flex: 1, minWidth: 300 },
    { field: "title", headerName: "Title", flex: 1, minWidth: 300 },
    { field: "subTitle", headerName: "Sub Title", flex: 1, minWidth: 300 },
    CommonActionColumn<WorkExperienceBase>({
      active: (row) => editWorkExperience({ workExperienceId: row?._id, isActive: !row.isActive }),
      onEdit: { handleEdit: (row) => handleEdit(row) },
      onDelete: (row) => setRowToDelete({ _id: row?._id, title: row?.title }),
    }),
  ];

  const CommonDataGridOption = {
    columns,
    rows: allWorkExperience,
    rowCount: totalRows,
    loading: WorkExperienceDataLoading || WorkExperienceDataFetching || isEditLoading,
    isActive,
    setActive,
    handleAdd,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    sortModel,
    onSortModelChange: setSortModel,
    filterModel,
    onFilterModelChange: setFilterModel,
    fileName: PAGE_TITLE.WORK_EXPERIENCE.BASE,
    isExport: false,
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.WORK_EXPERIENCE.BASE} maxItems={1} breadcrumbs={BREADCRUMBS.WORK_EXPERIENCE.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, display: "grid", gap: 2 }}>
        <CommonCard hideDivider>
          <CommonDataGrid {...CommonDataGridOption} />
        </CommonCard>
        <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
        <WorkExperienceForm />
      </Box>
    </>
  );
};

export default WorkExperience;
