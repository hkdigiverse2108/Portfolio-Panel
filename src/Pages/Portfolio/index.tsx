import { Box } from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Mutations, Queries } from "../../Api";
import { AdvancedSearch, CommonActionColumn, CommonBreadcrumbs, CommonDataGrid, CommonDeleteModal } from "../../Components/Common";
import { CommonObjectPropertyColumn } from "../../Components/Common/CommonDataGrid/CommonColumns";
import { PAGE_TITLE, ROUTES } from "../../Constants";
import { BREADCRUMBS } from "../../Data";
import type { AppGridColDef, PortfolioBase } from "../../Types";
import { CreateFilter, GenerateOptions } from "../../Utils";
import { useDataGrid } from "../../Utils/Hooks";

const Portfolio = () => {
  const { paginationModel, setPaginationModel, sortModel, setSortModel, filterModel, setFilterModel, rowToDelete, setRowToDelete, isActive, setActive, advancedFilter, updateAdvancedFilter, params } = useDataGrid();
  const navigate = useNavigate();

  const { data: portfolioData, isLoading: portfolioDataLoading, isFetching: portfolioDataFetching } = Queries.useGetPortfolio(params);
  const { data: serviceData, isLoading: serviceDataLoading } = Queries.useGetService({ activeFilter: true });

  const { mutate: editPortfolio, isPending: isEditLoading } = Mutations.useEditPortfolio();
  const { mutate: deletePortfolioMutate, isPending: isDeleteLoading } = Mutations.useDeletePortfolio();

  const allPortfolio = useMemo(() => portfolioData?.data?.portfolio_data.map((emp) => ({ ...emp, id: emp?._id, removeQty: null })) || [], [portfolioData]);
  const totalRows = portfolioData?.data?.totalData || 0;

  const handleAdd = () => navigate(ROUTES.PORTFOLIO.ADD_EDIT);

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deletePortfolioMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const columns: AppGridColDef<PortfolioBase>[] = [
    CommonObjectPropertyColumn<PortfolioBase>("thumbnailImage", "thumbnailImage", [], { headerName: "Thumbnail Image", width: 150, type: "image" }),
    { field: "title", headerName: "title", flex: 1, minWidth: 200 },
    { field: "subTitle", headerName: "Sub Title", flex: 1, minWidth: 200 },
    { field: "projectName", headerName: "Project Name", flex: 1, minWidth: 150 },
    { field: "client", headerName: "Client", flex: 1, minWidth: 150 },
    { field: "technology", headerName: "Technology", flex: 1, minWidth: 150 },
    CommonObjectPropertyColumn<PortfolioBase>("date", "date", [], { headerName: "Date", flex: 1, minWidth: 150, type: "date" }),
    CommonActionColumn<PortfolioBase>({
      active: (row) => editPortfolio({ portfolioId: row?._id, isActive: !row.isActive }),
      editRoute: ROUTES.PORTFOLIO.ADD_EDIT,
      onDelete: (row) => setRowToDelete({ _id: row?._id, title: row?.title }),
    }),
  ];

  const CommonDataGridOption = {
    columns,
    rows: allPortfolio,
    rowCount: totalRows,
    loading: portfolioDataLoading || portfolioDataFetching || isEditLoading,
    isActive,
    setActive,
    handleAdd,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    sortModel,
    onSortModelChange: setSortModel,
    filterModel,
    onFilterModelChange: setFilterModel,
    fileName: PAGE_TITLE.PORTFOLIO.BASE,
    isExport: false,
  };

  const filter = [
    CreateFilter("Select Service", "serviceFilter", advancedFilter, updateAdvancedFilter, GenerateOptions(serviceData?.data?.service_data), serviceDataLoading, { xs: 12, sm: 6, md: 3 }), // categoryFilter
  ];

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.PORTFOLIO.BASE} maxItems={1} breadcrumbs={BREADCRUMBS.PORTFOLIO.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, display: "grid", gap: 2 }}>
        <AdvancedSearch filter={filter} />
        <CommonDataGrid {...CommonDataGridOption} />
        <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
      </Box>
    </>
  );
};

export default Portfolio;
