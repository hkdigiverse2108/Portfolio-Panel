import { Box } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDataGrid } from "../../Utils/Hooks";
import { Mutations, Queries } from "../../Api";
import { CommonActionColumn, CommonBreadcrumbs, CommonCard, CommonDataGrid, CommonDeleteModal } from "../../Components/Common";
import { PAGE_TITLE, ROUTES } from "../../Constants";
import type { HeroSectionBase } from "../../Types/HeroSection";
import { BREADCRUMBS } from "../../Data/Breadcrumbs";

const HeroSection = () => {
  const { paginationModel, setPaginationModel, sortModel, setSortModel, filterModel, setFilterModel, rowToDelete, setRowToDelete, isActive, setActive, params } = useDataGrid();
  const navigate = useNavigate();

  const { data: heroSection_data, isLoading: heroSectionLoading, isFetching: heroSectionFetching } = Queries.useGetHeroSection(params);
  const { refetch: fetchAll, isFetching: AllFetching, isLoading: AllLoading } = Queries.useGetHeroSection();

  const { mutate: deleteHeroSectionMutate } = Mutations.useDeleteHeroSection();
  const { mutate: editHeroSection, isPending: isEditLoading } = Mutations.useEditHeroSection();

  const allCreditNotes = useMemo(() => heroSection_data?.data?.heroSection_data.map((HeroSection) => ({ ...HeroSection, id: HeroSection?._id })) || [], [heroSection_data]);
  const totalRows = heroSection_data?.data?.totalData || 0;

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteHeroSectionMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const handleAdd = () => navigate(ROUTES.HERO_SECTION.UPDATE);

  const columns: GridColDef<HeroSectionBase>[] = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "subTitles", headerName: "Sub Titles", width: 200 },
    { field: "linkTitle", headerName: "Link Title", width: 200 },
    { field: "link", headerName: "Link", width: 200 },
    { field: "description", headerName: "Description", flex: 1, minWidth: 200 },
    CommonActionColumn<HeroSectionBase>({
      active: (row) => editHeroSection({ heroSectionId: row?._id as string, isActive: !row.isActive }),
      editRoute: ROUTES.HERO_SECTION.UPDATE,
      onDelete: (row) => setRowToDelete({ _id: row?._id, title: row?.title }),
    }),
  ];

  const CommonDataGridOption = {
    columns,
    rows: allCreditNotes,
    rowCount: totalRows,
    loading: heroSectionLoading || heroSectionFetching || isEditLoading,
    isActive,
    setActive,
    handleAdd,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    sortModel,
    onSortModelChange: setSortModel,
    filterModel,
    onFilterModelChange: setFilterModel,
    fileName: PAGE_TITLE.HERO_SECTION.BASE,
    onExportAll: { onExportAll: fetchAll, isFetching: AllLoading || AllFetching },
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.HERO_SECTION.BASE} maxItems={1} breadcrumbs={BREADCRUMBS.HERO_SECTION.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, display: "grid" }}>
        <CommonCard hideDivider>
          <CommonDataGrid {...CommonDataGridOption} />
        </CommonCard>
        <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
      </Box>
    </>
  );
};

export default HeroSection;
