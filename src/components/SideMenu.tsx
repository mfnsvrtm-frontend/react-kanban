import MenuIcon from '@mui/icons-material/Menu';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';

interface SideMenuProps {
  onSave: () => void;
  onLoad: () => void;
}

const SideMenu = ({ onSave, onLoad }: SideMenuProps): React.ReactNode => {
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
            <DownloadIcon />
            <Typography variant='caption' >Save</Typography>
          </Box>
        </IconButton>
        <IconButton size='large' sx={{ aspectRatio: '1' }} onClick={onLoad}>
          <Box display='grid' justifyItems='center'>
            <UploadIcon />
            <Typography variant='caption'>Load</Typography>
          </Box>
        </IconButton>
      </Box>
    </Box>
  );
};

export default SideMenu;