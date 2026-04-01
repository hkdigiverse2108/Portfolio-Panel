import { Box } from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Mutations, Queries } from "../../Api";
import { CommonActionColumn, CommonBreadcrumbs, CommonCard, CommonDataGrid, CommonDeleteModal } from "../../Components/Common";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data";
import type { AppGridColDef, ContactUsBase } from "../../Types";
import { useDataGrid } from "../../Utils/Hooks";
import ContactUsForm from "./ContactUsForm";
import { setContactUsModal } from "../../Store/Slices/ModalSlice";

const ContactUs = () => {
  const { paginationModel, setPaginationModel, sortModel, setSortModel, filterModel, setFilterModel, rowToDelete, setRowToDelete, isActive, setActive, params } = useDataGrid();
  const dispatch = useDispatch();
  const { data: ContactUsData, isLoading: ContactUsDataLoading, isFetching: ContactUsDataFetching } = Queries.useGetContactUs(params);

  const { mutate: deleteContactUsMutate, isPending: isDeleteLoading } = Mutations.useDeleteContactUs();
  const { mutate: editContactUs, isPending: isEditLoading } = Mutations.useEditContactUs();

  const allContactUs = useMemo(() => ContactUsData?.data?.contactUs_data.map((item) => ({ ...item, id: item?._id })) || [], [ContactUsData]);
  const totalRows = ContactUsData?.data?.totalData || 0;

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteContactUsMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const handleAdd = () => dispatch(setContactUsModal({ open: true, data: null }));

  const handleEdit = (row: ContactUsBase) => dispatch(setContactUsModal({ open: true, data: row }));

  const columns: AppGridColDef<ContactUsBase>[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 300 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 300 },
    { field: "phoneNo", headerName: "Phone No", flex: 1, minWidth: 300 },
    { field: "message", headerName: "Message", flex: 1, minWidth: 300 },
    CommonActionColumn<ContactUsBase>({
      active: (row) => editContactUs({ contactUsId: row?._id, isActive: !row.isActive }),
      onEdit: { handleEdit: (row) => handleEdit(row) },
      onDelete: (row) => setRowToDelete({ _id: row?._id, title: row?.name }),
    }),
  ];

  const CommonDataGridOption = {
    columns,
    rows: allContactUs,
    rowCount: totalRows,
    loading: ContactUsDataLoading || ContactUsDataFetching || isEditLoading,
    isActive,
    setActive,
    handleAdd,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    sortModel,
    onSortModelChange: setSortModel,
    filterModel,
    onFilterModelChange: setFilterModel,
    fileName: PAGE_TITLE.CONTACT_US.BASE,
    isExport: false,
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.CONTACT_US.BASE} maxItems={1} breadcrumbs={BREADCRUMBS.CONTACT_US.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, display: "grid", gap: 2 }}>
        <CommonCard hideDivider>
          <CommonDataGrid {...CommonDataGridOption} />
        </CommonCard>
        <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
        <ContactUsForm />
      </Box>
    </>
  );
};

export default ContactUs;
