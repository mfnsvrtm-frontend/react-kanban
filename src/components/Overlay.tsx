import { IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Overlay = (): React.ReactNode => {
  return (
    <Stack
      position='absolute'
      direction='row'
      width={1}
      height={1}
      gap={1}
      sx={{
        inset: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(5px)',
        cursor: 'grab'
      }}
    >
      <IconButton data-no-dnd size='large' color='warning'>
        <DeleteIcon />
      </IconButton>
      <IconButton data-no-dnd size='large' color='primary'>
        <EditIcon />
      </IconButton>
    </Stack>
  );
};

export default Overlay;