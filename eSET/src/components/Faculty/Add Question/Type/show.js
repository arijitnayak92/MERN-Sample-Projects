import React, { } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import PropTypes from 'prop-types';
import {  makeStyles } from '@material-ui/core/styles';
import {Typography,Paper,Button,TableHead,DialogContentText,
  Dialog,DialogActions,DialogTitle,DialogContent,Table,TableRow,TableBody,TableCell,TableContainer,IconButton,TablePagination,
} from '@material-ui/core';





function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {props.fielddata.map((headCell,index) => (
          <TableCell
            key={index}
            align="center"
            padding="none"
          >
               <b>{headCell.header}</b>
          </TableCell>
        ))}
        {props.modal_view && <TableCell align="center">Options</TableCell>}
        <TableCell align="center">Action</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  rowCount: PropTypes.number.isRequired,
};
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: '100%',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

 export default function EnhancedTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [option, setData] = React.useState({
    option_open:false,
    data:'',
  });
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const setOption = (row) => {
    setData({
      option_open:true,
      data:row,
    })
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);
  return (
    <div className={classes.root}>
          {option.option_open &&
            <Dialog
              open={option.option_open}
              keepMounted
              onClose={()=>setData({option_open:false})}
               aria-labelledby="scroll-dialog-title"
               aria-describedby="scroll-dialog-description"
             >
               <DialogTitle id="scroll-dialog-title" align="center">Options</DialogTitle>
           <DialogContent >
                 <DialogContentText
                   id="scroll-dialog-description"
                   tabIndex={-1}
                 >
                  {option.data.options.map((content,index)=>{
                    return(
                      <React.Fragment key={index}>
                        Option {index+1} - {content} <br />
                      </React.Fragment>
                    )
                  })}
                 </DialogContentText>
            </DialogContent>
          <DialogActions>
          <Button onClick={()=>setData({option_open:false})} color="primary">
            CLOSE
          </Button>
          </DialogActions>
        </Dialog>
      }
      <Paper elevation={3} className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              fielddata={props.fielddata}
              modal_view={props.modal_view}
              rowCount={props.data.length}
            />
            <TableBody>
              {props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                          {props.fielddata.map((content,ind)=>(
                            <TableCell align="center" padding="none" key={ind}>
                            {content.verify ?
                              <Typography>{row.set_timelimit ? "True" : "False"}</Typography>
                              :
                              <Typography>{row[content.name]}</Typography>
                            }

                             </TableCell>
                          ))}
                          {props.modal_view && <TableCell align="center" padding="none">
                            <IconButton onClick={()=>setOption(row)}><InfoIcon  /></IconButton>
                          </TableCell>}
                          <TableCell align="center" padding="none">
                                 <IconButton onClick={() => props.editProduct(row.serial,props.action)}>
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton onClick={() => props.deleteProduct(row.serial,props.action)} >
                                    <DeleteIcon color="secondary" />
                                  </IconButton>
                          </TableCell>

                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
