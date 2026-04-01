import { Box } from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Mutations, Queries } from "../../Api";
import { CommonActionColumn, CommonBreadcrumbs, CommonCard, CommonDataGrid, CommonDeleteModal } from "../../Components/Common";
import { CommonObjectPropertyColumn } from "../../Components/Common/CommonDataGrid/CommonColumns";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data";
import { setTestimonialModal } from "../../Store/Slices/ModalSlice";
import type { AppGridColDef, TestimonialBase } from "../../Types";
import { useDataGrid } from "../../Utils/Hooks";
import TestimonialForm from "./TestimonialForm";

const Testimonial = () => {
  const { paginationModel, setPaginationModel, sortModel, setSortModel, filterModel, setFilterModel, rowToDelete, setRowToDelete, isActive, setActive, params } = useDataGrid();
  const dispatch = useDispatch();

  const { data: TestimonialData, isLoading: TestimonialDataLoading, isFetching: TestimonialDataFetching } = Queries.useGetTestimonial(params);
  const { mutate: deleteTestimonialMutate, isPending: isDeleteLoading } = Mutations.useDeleteTestimonial();
  const { mutate: editTestimonial, isPending: isEditLoading } = Mutations.useEditTestimonial();

  const allTestimonial = useMemo(() => TestimonialData?.data?.testimonial_data.map((item) => ({ ...item, id: item?._id })) || [], [TestimonialData]);
  const totalRows = TestimonialData?.data?.totalData || 0;

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteTestimonialMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const handleAdd = () => dispatch(setTestimonialModal({ open: true, data: null }));

  const handleEdit = (row: TestimonialBase) => dispatch(setTestimonialModal({ open: true, data: row }));

  const columns: AppGridColDef<TestimonialBase>[] = [
    CommonObjectPropertyColumn<TestimonialBase>("image", "image", [], { headerName: "Image", flex: 1, minWidth: 200, type: "image" }),
    { field: "name", headerName: "Name", flex: 1, minWidth: 200 },
    { field: "designation", headerName: "Designation", flex: 1, minWidth: 200 },
    { field: "description", headerName: "Description", flex: 1, minWidth: 200 },
    CommonActionColumn<TestimonialBase>({
      active: (row) => editTestimonial({ testimonialId: row?._id, isActive: !row.isActive }),
      onEdit: { handleEdit: (row) => handleEdit(row) },
      onDelete: (row) => setRowToDelete({ _id: row?._id, title: row?.name }),
    }),
  ];

  const CommonDataGridOption = {
    columns,
    rows: allTestimonial,
    rowCount: totalRows,
    loading: TestimonialDataLoading || TestimonialDataFetching || isEditLoading,
    isActive,
    setActive,
    handleAdd,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    sortModel,
    onSortModelChange: setSortModel,
    filterModel,
    onFilterModelChange: setFilterModel,
    fileName: PAGE_TITLE.TESTIMONIAL.BASE,
    isExport: false,
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.TESTIMONIAL.BASE} maxItems={1} breadcrumbs={BREADCRUMBS.TESTIMONIAL.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, display: "grid" }}>
        <CommonCard hideDivider>
          <CommonDataGrid {...CommonDataGridOption} />
        </CommonCard>
        <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
        <TestimonialForm />
      </Box>
    </>
  );
};

export default Testimonial;
