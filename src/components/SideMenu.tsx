import MenuIcon from '@mui/icons-material/Menu';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';

interface SideMenuProps {
  onSave: () => void;
  onLoad: () => void;
  onClear: () => void;
  onSettings: () => void;
}

const SideMenu = ({ onSave, onLoad, onClear, onSettings }: SideMenuProps): React.ReactNode => {
  return (
    <Box
      display='grid'
      gridTemplateRows='min-content 0fr'
      position='fixed'
      top={80}
      left={15}
      zIndex={1}
      borderRadius='100vh'
      bgcolor='#fff'
      sx={{
        boxShadow: 1,
        transition: 'grid-template-rows 0.3s ease-in-out',
        '&:hover': {
          padding: '5px',
          transform: 'translate(-5px, -5px)',
          gridTemplateRows: 'auto 1fr'
        }
      }}
    >
      <IconButton
        size='large'
        sx={{
          aspectRatio: '1',
          '&': { transition: 'transform 0.3s ease-in-out' },
          '&:hover': { transform: 'rotate(180deg)' }
        }}>
        <MenuIcon />
      </IconButton>
      <Box display='grid' overflow='hidden'>
        <IconButton size='large' sx={{ aspectRatio: '1' }} onClick={onSave}>
          <Box display='grid' justifyItems='center'>
            <DownloadIcon/>
            <Typography variant='caption' >Save</Typography>
          </Box>
        </IconButton>
        <IconButton size='large' sx={{ aspectRatio: '1' }} onClick={onLoad}>
          <Box display='grid' justifyItems='center'>
            <UploadIcon />
            <Typography variant='caption'>Load</Typography>
          </Box>
        </IconButton>
        <IconButton size='large' sx={{ aspectRatio: '1' }} onClick={onClear}>
          <Box display='grid' justifyItems='center'>
            <DeleteIcon />
            <Typography variant='caption'>Clear</Typography>
          </Box>
        </IconButton>
        <IconButton size='large' sx={{ aspectRatio: '1' }} onClick={onSettings}>
          <Box display='grid' justifyItems='center'>
            <SettingsIcon />
            <Typography variant='caption'>Settings</Typography>
          </Box>
        </IconButton>
      </Box>
    </Box>
  );
};

export default SideMenu;