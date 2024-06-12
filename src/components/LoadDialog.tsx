import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

interface LoadDialogProps {
  data: string[];
  onLoad: (saveName: string) => void;
  onClose: () => void;
};

const LoadDialog = ({ data, onLoad, onClose }: LoadDialogProps): React.ReactNode => {
  const [selected, setSelected] = useState<null>(null);
  const [showError, setShowError] = useState(false);

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
            rows={data.map((name, id) => ({ id, name }))}
            columns={[{ field: 'name' }]}
            columnHeaderHeight={0}
            hideFooterSelectedRowCount
            autoPageSize
            onRowClick={(event) => { setSelected(event.row.name); console.log('setting'); }}
            slots={{
              noRowsOverlay: () => (
                <Box height='100%' display='grid' alignContent='center' justifyContent='center' bgcolor='#f5f5f5' >
                  You don't have any saves
                </Box>
              )
            }}
            sx={{
              '& .MuiDataGrid-row': { cursor: 'pointer' },
              '& .MuiDataGrid-cell:focus': { outline: 'none' },
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