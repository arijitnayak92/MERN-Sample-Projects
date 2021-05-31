import React from 'react'
import { addStyles, EditableMathField } from 'react-mathquill'
import
{
  Grid,Snackbar
} from '@material-ui/core';
import axios from 'axios'
import MuiAlert from '@material-ui/lab/Alert';


addStyles()
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default class Math extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      latex: '',
      snack_open:false,
      alert_type:'',
      snack_msg:'',
      flag:'',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {

  }


  render() {
    return (
        <React.Fragment>
            <Snackbar
		        open={this.state.snack_open} autoHideDuration={2000}
		        onClose={()=>this.setState({snack_open:false})}>
      			    <Alert onClose={()=>this.setState({snack_open:false})}
      			    severity={this.state.alert_type}>
      				{this.state.snack_msg}
      			    </Alert>
		        </Snackbar>

            <EditableMathField
              latex={this.state.latex}
              onChange={mathField => {
                  this.setState({ latex: mathField.latex() })
              }}
            />
        </React.Fragment>

    )
  }
}
