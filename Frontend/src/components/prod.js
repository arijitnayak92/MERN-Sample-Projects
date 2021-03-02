import React ,{useState,useEffect} from 'react'
import {fetchProduct} from '../auth/index'
import {Grid,Typography,Button,Card,CardMedia,
  CardActions,CardActionArea,Dialog,DialogTitle,DialogActions,
  DialogContent,DialogContentText,CardContent,
  }
  from '@material-ui/core';

const ProdMain=(props)=>{
  console.log(props);
  const [all_prod,setProd]=useState([])
  const [detail_view,setFullView] = useState(false)
  const [fetching,setLoader] = useState(true)
  const [single_detail,setSingle] = useState([])

  useEffect(()=>{
    fetchProduct()
    .then(res=>{
      setProd(res)
      setLoader(false)
    })

    //indexOf
  },[])

 const showDetails=(item)=>{
   let single_prod  = all_prod.filter(itm=>itm.Name ===  item.Name);
   if(single_prod.length)
   {
     setSingle(single_prod)
     setFullView(true)
   }
   else {
     alert("Not Found !")
   }
 }

if(fetching)
{
  return(
    <>Loading...</>
  )
}
else{
  return(
    <>
     {detail_view &&
        <>
          <Dialog
            open={detail_view}
            onClose={()=>setFullView(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Details of the Product "}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  {single_detail.map((c,index)=>(
                    <React.Fragment key={index}>
                    <Typography variant="h6">Name of the product - {c.Name}</Typography>
                    <Typography variant="h6">Price of the product - {c.Price}</Typography>
                    <Typography variant="h6">Category of the product - {c.Category}</Typography>
                    <Typography variant="h6">Type of the product - {c.Type}</Typography>
                    <Typography variant="h6">Name of the manufracturer - {c.Manufacturer}</Typography>
                    <Typography variant="h6">Name of the Seller - {c.Seller}</Typography>
                    </React.Fragment>
                  ))}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>setFullView(false)} color="primary">
                Close
              </Button>
            </DialogActions>
            </Dialog>
        </>
     }
     <div style={{padding:'10px'}}>
     {all_prod.map((item,index)=>{
       return(
         <Card style={{margin:'10px'}}>
          <CardActionArea>
            <CardMedia
              image={item.Image}
              title={item.Name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.Name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
               {item.Description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button href={`http://localhost:3000/product/${index+1}`} size="small" color="primary" onClick={()=>showDetails(item)}>
              View
            </Button>
          </CardActions>
        </Card>
       )
     })}
     </div>
    </>
  )
}

}

export default ProdMain;
