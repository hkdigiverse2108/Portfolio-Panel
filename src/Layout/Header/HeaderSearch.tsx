import { IconButton, InputBase, Paper } from "@mui/material";
import { Search } from "@mui/icons-material";

const HeaderSearch = () => {
  return (
    <div className="hidden md:flex flex-1 max-w-md mx-4">
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          borderRadius: '9999px',
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'var(--color-gray-200)',
          backgroundColor: 'var(--color-gray-50)',
          '.dark &': {
            borderColor: '#374151', /* gray-700 */
            backgroundColor: 'rgba(31, 41, 55, 0.5)', /* gray-800/50 */
          }
        }}
        className="hover:bg-white dark:hover:bg-gray-800 transition-colors"
      >
        <IconButton sx={{ p: '8px' }} aria-label="search" className="text-gray-400! dark:text-gray-500!">
          <Search fontSize="small" />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search projects, messages..."
          inputProps={{ 'aria-label': 'search' }}
          className="text-sm dark:text-gray-200"
        />
      </Paper>
    </div>
  );
};

export default HeaderSearch;
