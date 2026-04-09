import { Box } from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Mutations, Queries } from "../../Api";
import { CommonActionColumn, CommonBreadcrumbs, CommonCard, CommonDataGrid, CommonDeleteModal } from "../../Components/Common";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data";
import { setBusinessCategoryModal } from "../../Store/Slices/ModalSlice";
import type { AppGridColDef, BusinessCategoryBase } from "../../Types";
import { useDataGrid } from "../../Utils/Hooks";
import BusinessCategoryForm from "./BusinessCategoryForm";

const BusinessCategory = () => {
  const { paginationModel, setPaginationModel, sortModel, setSortModel, filterModel, setFilterModel, rowToDelete, setRowToDelete, isActive, setActive, params } = useDataGrid();
  const dispatch = useDispatch();
  const { data: BusinessCategoryData, isLoading: BusinessCategoryDataLoading, isFetching: BusinessCategoryDataFetching } = Queries.useGetBusinessCategory(params);

  const { mutate: deleteBusinessCategoryMutate , isPending: isDeleteLoading} = Mutations.useDeleteBusinessCategory();
  const { mutate: editBusinessCategory, isPending: isEditLoading } = Mutations.useEditBusinessCategory();

  const allBusinessCategory = useMemo(() => BusinessCategoryData?.data?.businessCategory_data.map((item) => ({ ...item, id: item?._id })) || [], [BusinessCategoryData]);
  const totalRows = BusinessCategoryData?.data?.totalData || 0;

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteBusinessCategoryMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const handleAdd = () => dispatch(setBusinessCategoryModal({ open: true, data: null }));

  const handleEdit = (row: BusinessCategoryBase) => dispatch(setBusinessCategoryModal({ open: true, data: row }));

  const columns: AppGridColDef<BusinessCategoryBase>[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 300 },
    CommonActionColumn<BusinessCategoryBase>({
      active: (row) => editBusinessCategory({ businessCategoryId: row?._id, isActive: !row.isActive }),
      onEdit: { handleEdit: (row) => handleEdit(row) },
      onDelete: (row) => setRowToDelete({ _id: row?._id, title: row?.name }),
    }),
  ];

  const CommonDataGridOption = {
    columns,
    rows: allBusinessCategory,
    rowCount: totalRows,
    loading: BusinessCategoryDataLoading || BusinessCategoryDataFetching || isEditLoading,
    isActive,
    setActive,
    handleAdd,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    sortModel,
    onSortModelChange: setSortModel,
    filterModel,
    onFilterModelChange: setFilterModel,
    fileName: PAGE_TITLE.BUSINESS_CATEGORY.BASE,
    isExport: false,
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.BUSINESS_CATEGORY.BASE} maxItems={1} breadcrumbs={BREADCRUMBS.BUSINESS_CATEGORY.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, display: "grid", gap: 2 }}>
        <CommonCard hideDivider>
          <CommonDataGrid {...CommonDataGridOption} />
        </CommonCard>
        <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
        <BusinessCategoryForm />
      </Box>
    </>
  );
};

export default BusinessCategory;
