
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import {FormControl,InputLabel,Select,MenuItem,TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';



class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      value:'',
      serial:'',
      val:'',
      link:'',
      action:'',
      usertype:'',
      username:'',
      college_name:'',
      selected_campus:[],
      colleges:[],
    }
    if(this.props.product){
      this.state = this.props.product
    } else {
      this.state = this.initialState;
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleD = (event,index) =>{
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }

  componentDidMount(){
    this.setState({
      action:this.props.action,
      usertype:this.props.usertype,
      inserted_by:this.props.username,
    })
    if(this.props.dataSet)
    {
      this.setState({usertype:this.props.dataSet.school_name,college_name:this.props.dataSet.college_name,campus:this.props.dataSet.campus})
    }
    if(this.props.campus)
    {
      this.setState({campus:this.props.campus})
    }
  }

  handleSubmit(event) {
      event.preventDefault();
      this.props.onFormSubmit(this.state);
      this.setState(this.initialState);
  }

  render() {
    const Campus =
    [
      { title: 'KTR'},
      { title: 'RAMAPURAM'},
      { title: 'DELHI'},
      { title: 'AP'}
    ];
    console.log(this.props);
    return(
      <Dialog open={true}
      fullWidth keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      >
       <DialogContent>
       <div style={{padding:'10px'}}>
              {this.props.data.fielddata.map((content,index)=>(
                <React.Fragment key={index}>
                {content.select ?
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={Campus}
                    getOptionLabel={(option) => option.title}
                    value={this.state.selected_campus}
                    onChange={(event, newValue) =>this.setState({selected_campus:[...newValue]})}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select Campuses who can see"
                        placeholder="Select Campuses"
                      />
                    )}
                  />
                  :
                  <React.Fragment>
                    {content.college ?
                      <React.Fragment>
                      {this.props.colleges &&
                        <FormControl variant="outlined" style={{width:'100%'}}>
                         <InputLabel id="demo-simple-select-outlined-label">
                           Select College
                         </InputLabel>
                         <Select
                         labelId="campus"
                         id="campus"
                         disabled={this.props.colleges.length>0 ? false : true}
                         value={this.state.college_name}
                         name="campus" onChange={(e)=>this.setState({college_name:e.target.value})}
                         labelWidth={100}
                         >
                           {this.props.colleges.map((content,index)=>{
                                 return(
                                   <MenuItem key={index} value={content.college_name}>{content.college_name}</MenuItem>
                                 )
                           })}
                         </Select>
                       </FormControl>
                      }
                      </React.Fragment>
                      :
                          <React.Fragment>
                            {content.dept_modal ?
                              <React.Fragment></React.Fragment>
                               :
                               <TextField
                                 id={content.name}
                                 label={content.placeholder}
                                 fullWidth
                                 type={content.type}
                                 name={content.name}
                                 value={this.state[content.name]}
                                 onChange={e => this.handleD(e, index)}
                                 variant="outlined"
                                 />
                            }
                          </React.Fragment>
                    }
                  </React.Fragment>
                }
                    <br /><br />
                </React.Fragment>
              ))}
          </div>
        </DialogContent>
         <DialogActions>
         <Button onClick={this.props.cancel} color="secondary">
           Close
         </Button>
           <Button disabled={this.state.disabled} onClick={this.handleSubmit} color="primary">
             UPLOAD
           </Button>
         </DialogActions>
     </Dialog>
    )
  }
}

export default AddProduct;
