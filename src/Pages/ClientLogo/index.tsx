import { Box } from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Mutations, Queries } from "../../Api";
import { CommonActionColumn, CommonBreadcrumbs, CommonCard, CommonDataGrid, CommonDeleteModal } from "../../Components/Common";
import { CommonObjectPropertyColumn } from "../../Components/Common/CommonDataGrid/CommonColumns";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data";
import type { AppGridColDef, ClientLogoBase } from "../../Types";
import { useDataGrid } from "../../Utils/Hooks";
import BrandForm from "./ClientLogoForm";
import { setClientLogoModal } from "../../Store/Slices/ModalSlice";

const ClientLogo = () => {
  const { paginationModel, setPaginationModel, sortModel, setSortModel, filterModel, setFilterModel, rowToDelete, setRowToDelete, isActive, setActive, params } = useDataGrid();
  const dispatch = useDispatch();

  const { data: BrandsData, isLoading: brandsDataLoading, isFetching: brandsDataFetching } = Queries.useGetClientLogo(params);
  const { mutate: deleteBrandsMutate, isPending: isDeleteLoading } = Mutations.useDeleteClientLogo();
  const { mutate: editBrand, isPending: isEditLoading } = Mutations.useEditClientLogo();

  const allBrands = useMemo(() => BrandsData?.data?.clientLogo_data.map((item) => ({ ...item, id: item?._id })) || [], [BrandsData]);
  const totalRows = BrandsData?.data?.totalData || 0;

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteBrandsMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const handleAdd = () => dispatch(setClientLogoModal({ open: true, data: null }));

  const handleEdit = (row: ClientLogoBase) => dispatch(setClientLogoModal({ open: true, data: row }));

  const columns: AppGridColDef<ClientLogoBase>[] = [
    CommonObjectPropertyColumn<ClientLogoBase>("image", "image", [], { headerName: "Image", flex: 1, minWidth: 200, type: "image" }),
    { field: "name", headerName: "Name", flex: 1, minWidth: 200 },
    { field: "link", headerName: "Link", flex: 1, minWidth: 200 },
    CommonActionColumn<ClientLogoBase>({
      active: (row) => editBrand({ clientLogoId: row?._id, isActive: !row.isActive }),
      onEdit: { handleEdit: (row) => handleEdit(row) },
      onDelete: (row) => setRowToDelete({ _id: row?._id, title: row?.name }),
    }),
  ];

  const CommonDataGridOption = {
    columns,
    rows: allBrands,
    rowCount: totalRows,
    loading: brandsDataLoading || brandsDataFetching || isEditLoading,
    isActive,
    setActive,
    handleAdd,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    sortModel,
    onSortModelChange: setSortModel,
    filterModel,
    onFilterModelChange: setFilterModel,
    fileName: PAGE_TITLE.CLIENT_LOGO.BASE,
    isExport: false,
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.CLIENT_LOGO.BASE} maxItems={1} breadcrumbs={BREADCRUMBS.CLIENT_LOGO.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, display: "grid" }}>
        <CommonCard hideDivider>
          <CommonDataGrid {...CommonDataGridOption} />
        </CommonCard>
        <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
        <BrandForm />
      </Box>
    </>
  );
};

export default ClientLogo;
