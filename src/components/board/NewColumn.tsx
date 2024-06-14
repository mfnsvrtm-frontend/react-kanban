import AddIcon from '@mui/icons-material/Add';
import { Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import useDialog from '../../hooks/useDialog';
import { DialogType } from '../dialogs/BoardDialog';
import { useBoardContext } from '../../providers/BoardContextProvider';

const NewColumn = (): React.ReactNode => {
  const { addColumn } = useBoardContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
  }, []);

  const openDialog = useDialog({
    type: DialogType.AddColumn,
    onSuccess: (data: FormData) => {
      addColumn({
        title: data.get('title') as string,
      });
    }
  });

  return (
    <Stack onClick={openDialog} height='calc(100vh - 100px)' width={300} gap={1.5} sx={{ cursor: 'pointer' }} >
      <Paper ref={scrollRef} variant='outlined' sx={{ padding: 1.5, borderStyle: 'dashed' }}>
        <Typography sx={{ color: 'divider', userSelect: 'none' }} fontSize={16} fontWeight={400} textAlign='center'>New column</Typography>
      </Paper>
      <Paper variant='outlined' sx={{ display: 'grid', placeContent: 'center', padding: 1.5, height: 1, borderStyle: 'dashed' }} >
        <AddIcon sx={{ color: 'divider' }} />
      </Paper>
    </Stack>
  );
};

export default NewColumn;