import AddIcon from '@mui/icons-material/Add';
import { Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import useDialog from '../hooks/useDialog';
import { DialogType } from './BoardDialog';
import { useBoardContext } from '../providers/BoardContextProvider';

const NewColumn = (): React.ReactNode => {
  const { addColumn } = useBoardContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [])

  const openDialog= useDialog({
    type: DialogType.AddColumn,
    onSuccess: (data: FormData) => {
      addColumn({
          title: data.get('title') as string,
      })
    }
  });

  return (
    <Stack ref={ref} onClick={openDialog} width={300} gap={1.5} sx={{ cursor: 'pointer' }} >
      <Paper variant='outlined' sx={{ padding: 1.5, borderStyle: 'dashed' }}>
        <Typography sx={{ color: 'divider', userSelect: 'none' }} fontSize={16} fontWeight={400} textAlign='center'>New column</Typography>
      </Paper>
      <Paper  variant='outlined' sx={{ display: 'grid', placeContent: 'center', padding: 1.5, height: 1, borderStyle: 'dashed' }} >
        <AddIcon sx={{ color: 'divider' }} />
      </Paper>
    </Stack>
  );
};

export default NewColumn;