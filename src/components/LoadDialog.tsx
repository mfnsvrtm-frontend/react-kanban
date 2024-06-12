import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Alert, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

interface LoadDialogProps {
  data: { id: string, name: string }[];
  onLoad: (id: string) => void;
  onClose: () => void;
  onDelete: (id: string) => void;
};

const LoadDialog = ({ data, onLoad, onClose, onDelete }: LoadDialogProps): React.ReactNode => {
  const [selected, setSelected] = useState<null>(null);
  const [showError, setShowError] = useState(false);

  const renderCell = (params: GridRenderCellParams) => {
    return (
      <IconButton color='warning' onClick={() => onDelete(params.row.id)}>
        <DeleteIcon/>
      </IconButton>
    );
  };

  return (
    <Dialog
      open
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (selected)
            onLoad(selected as string);
          else
            setShowError(true);
        },
      }}
    >
      <DialogTitle>Load a board</DialogTitle>
      <DialogContent>
        <Box width={500} height={315}>
          <DataGrid
            rows={data.map(({ name, id })=> ({ id, name }))}
            columns={[{ flex: 1, field: 'name' }, { field: 'action', width: 60, renderCell }]}
            columnHeaderHeight={0}
            hideFooterSelectedRowCount
            autoPageSize
            onRowClick={(event) => { setSelected(event.row.id); }}
            slots={{
              noRowsOverlay: () => (
                <Box height='100%' display='grid' alignContent='center' justifyContent='center' bgcolor='#f5f5f5' >
                  You don't have any saves
                </Box>
              )
            }}
            sx={{
              '& .MuiDataGrid-row': { cursor: 'pointer' },
              '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': { outline: 'none' },
              '& .MuiTablePagination-displayedRows': { display: 'none' }
            }}
          />
        </Box>
        {showError
          ? (
            <Alert sx={{ mt: 2 }} severity='warning' >Please select a save</Alert>
          ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type='submit'>Load</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoadDialog;