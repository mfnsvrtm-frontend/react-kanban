import { IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface OverlayProps {
  onEdit: () => void;
  onDelete: () => void;
}

const Overlay = ({ onEdit, onDelete }: OverlayProps): React.ReactNode => {
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
        backdropFilter: 'blur(30px)',
        backgroundColor: 'rgba(0, 0, 0, 0.01)'
      }}
    >
      <IconButton data-no-dnd size='large' color='warning' onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
      <IconButton data-no-dnd size='large' color='inherit' onClick={onEdit}>
        <EditIcon />
      </IconButton>
    </Stack>
  );
};

export default Overlay;