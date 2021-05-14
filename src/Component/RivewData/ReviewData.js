import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
const ReviewData = (props) => {
    const classes = useStyles();
    
    const {name,quantity, key, price}= props.product;
    
    
    return (
        <Card className={classes.root} style={{width:'100%', marginTop:"50px"}}>
      <CardContent>
        
        <Typography style={{color:'blue'}} variant="h5">
          {name}
        </Typography>
        <Typography variant="h5">
          Quantity: {quantity}
          <p>price: ${price}</p>
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="secondary" variant='contained' onClick={()=>props.removeProduct(key)} size="large">Remove</Button>
      </CardActions>
    </Card>
    );
};

export default ReviewData;