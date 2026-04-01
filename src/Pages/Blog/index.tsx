import { Box } from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Mutations, Queries } from "../../Api";
import { AdvancedSearch, CommonActionColumn, CommonBreadcrumbs, CommonDataGrid, CommonDeleteModal } from "../../Components/Common";
import { CommonObjectPropertyColumn } from "../../Components/Common/CommonDataGrid/CommonColumns";
import { PAGE_TITLE, ROUTES } from "../../Constants";
import { BREADCRUMBS } from "../../Data";
import type { AppGridColDef, BlogBase } from "../../Types";
import { CreateFilter, GenerateOptions } from "../../Utils";
import { useDataGrid } from "../../Utils/Hooks";

const Blog = () => {
  const { paginationModel, setPaginationModel, sortModel, setSortModel, filterModel, setFilterModel, rowToDelete, setRowToDelete, isActive, setActive, advancedFilter, updateAdvancedFilter, params } = useDataGrid();
  const navigate = useNavigate();

  const { data: blogData, isLoading: blogDataLoading, isFetching: blogDataFetching } = Queries.useGetBlog(params);
  const { data: serviceData, isLoading: serviceDataLoading } = Queries.useGetService({ activeFilter: true });

  const { mutate: editBlog, isPending: isEditLoading } = Mutations.useEditBlog();
  const { mutate: deleteBlogMutate, isPending: isDeleteLoading } = Mutations.useDeleteBlog();

  const allBlog = useMemo(() => blogData?.data?.blog_data.map((emp) => ({ ...emp, id: emp?._id, removeQty: null })) || [], [blogData]);
  const totalRows = blogData?.data?.totalData || 0;

  const handleAdd = () => navigate(ROUTES.BLOG.ADD_EDIT);

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteBlogMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const columns: AppGridColDef<BlogBase>[] = [
    CommonObjectPropertyColumn<BlogBase>("service", "serviceId", ["name"], { headerName: "Service", flex: 1, minWidth: 150 }),
    { field: "title", headerName: "title", flex: 1, minWidth: 200 },
    { field: "tagLine", headerName: "tagLine", flex: 1, minWidth: 150 },
    CommonObjectPropertyColumn<BlogBase>("date", "date", [], { headerName: "Date", flex: 1, minWidth: 150, type: "date" }),
    CommonActionColumn<BlogBase>({
      active: (row) => editBlog({ blogId: row?._id, isActive: !row.isActive }),
      editRoute: ROUTES.BLOG.ADD_EDIT,
      onDelete: (row) => setRowToDelete({ _id: row?._id, title: row?.title }),
    }),
  ];

  const CommonDataGridOption = {
    columns,
    rows: allBlog,
    rowCount: totalRows,
    loading: blogDataLoading || blogDataFetching || isEditLoading,
    isActive,
    setActive,
    handleAdd,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    sortModel,
    onSortModelChange: setSortModel,
    filterModel,
    onFilterModelChange: setFilterModel,
    fileName: PAGE_TITLE.BLOG.BASE,
    isExport: false,
  };

  const filter = [
    CreateFilter("Select Service", "serviceFilter", advancedFilter, updateAdvancedFilter, GenerateOptions(serviceData?.data?.service_data), serviceDataLoading, { xs: 12, sm: 6, md: 3 }), // categoryFilter
  ];

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.BLOG.BASE} maxItems={1} breadcrumbs={BREADCRUMBS.BLOG.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, display: "grid", gap: 2 }}>
        <AdvancedSearch filter={filter} />
        <CommonDataGrid {...CommonDataGridOption} />
        <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
      </Box>
    </>
  );
};

export default Blog;
