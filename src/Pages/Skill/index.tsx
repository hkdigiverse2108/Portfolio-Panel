import { Box } from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Mutations, Queries } from "../../Api";
import { CommonActionColumn, CommonBreadcrumbs, CommonCard, CommonDataGrid, CommonDeleteModal } from "../../Components/Common";
import { CommonObjectPropertyColumn } from "../../Components/Common/CommonDataGrid/CommonColumns";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data";
import { setSkillModal } from "../../Store/Slices/ModalSlice";
import type { AppGridColDef, SkillBase } from "../../Types";
import { useDataGrid } from "../../Utils/Hooks";
import SkillForm from "./SkillForm";

const Skill = () => {
  const { paginationModel, setPaginationModel, sortModel, setSortModel, filterModel, setFilterModel, rowToDelete, setRowToDelete, isActive, setActive, params } = useDataGrid();
  const dispatch = useDispatch();

  const { data: SkillData, isLoading: skillDataLoading, isFetching: skillDataFetching } = Queries.useGetSkill(params);
  const { mutate: deleteSkillMutate, isPending: isDeleteLoading } = Mutations.useDeleteSkill();
  const { mutate: editSkill, isPending: isEditLoading } = Mutations.useEditSkill();

  const allSkills = useMemo(() => SkillData?.data?.skill_data.map((item) => ({ ...item, id: item?._id })) || [], [SkillData]);
  const totalRows = SkillData?.data?.totalData || 0;

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteSkillMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const handleAdd = () => dispatch(setSkillModal({ open: true, data: null }));

  const handleEdit = (row: SkillBase) => dispatch(setSkillModal({ open: true, data: row }));

  const columns: AppGridColDef<SkillBase>[] = [
    CommonObjectPropertyColumn<SkillBase>("image", "image", [], { headerName: "Image", flex: 1, minWidth: 200, type: "image" }),
    { field: "title", headerName: "Title", flex: 1, minWidth: 200 },
    { field: "percentage", headerName: "Percentage", flex: 1, minWidth: 200 },
    CommonActionColumn<SkillBase>({
      active: (row) => editSkill({ skillId: row?._id, isActive: !row.isActive }),
      onEdit: { handleEdit: (row) => handleEdit(row) },
      onDelete: (row) => setRowToDelete({ _id: row?._id, title: row?.title }),
    }),
  ];

  const CommonDataGridOption = {
    columns,
    rows: allSkills,
    rowCount: totalRows,
    loading: skillDataLoading || skillDataFetching || isEditLoading,
    isActive,
    setActive,
    handleAdd,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    sortModel,
    onSortModelChange: setSortModel,
    filterModel,
    onFilterModelChange: setFilterModel,
    fileName: PAGE_TITLE.SKILL.BASE,
    isExport: false,
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.SKILL.BASE} maxItems={1} breadcrumbs={BREADCRUMBS.SKILL.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, display: "grid" }}>
        <CommonCard hideDivider>
          <CommonDataGrid {...CommonDataGridOption} />
        </CommonCard>
        <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
        <SkillForm />
      </Box>
    </>
  );
};

export default Skill;
