import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useState } from 'react';

const InfoCard = (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(true);

  // https://meta.superuser.com/questions/4788/css-for-the-new-kbd-style
  const kbdStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    borderRadius: "3px",
    boxShadow: "0 1px 0 rgba(0,0,0,0.2),0 0 0 2px #fff inset",
    color: "#333",
    display: "inline-block",
    fontFamily: "sans-serif",
    fontSize: "11px",
    lineHeight: "1.4",
    margin: "0 .1em",
    padding: ".1em .6em",
  };

  const body = (
    <Card sx={{ position: 'fixed', bottom: 15, right: 15, width: 300 }}>
      <CardContent sx={{ pb: 0 }}>
        <Typography variant="body2" color="text.secondary">
          Hold down <kbd style={kbdStyle} >Ctrl</kbd> in order to create a new column.
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'end' }} >
        <Button onClick={() => setIsOpen(false)} sx={{ fontSize: '12px', minWidth: '0', px: 1.5 }}>Ok</Button>
        <Button onClick={() => setIsOpen(false)} sx={{ fontSize: '12px', minWidth: '0', px: 1.5 }}>Don't show this again</Button>
      </CardActions>
    </Card>
  );

  return isOpen ? body : '';
};

export default InfoCard;