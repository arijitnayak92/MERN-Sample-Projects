import React,{useState,useEffect} from 'react';
import {Grid,TextField,Paper,Typography,Button} from '@material-ui/core';
import {loginRoute,signupRoute,checktokenRoute,fetchImage} from '../auth/index';
import history from '../routes/history'

const MainPage=()=>{
  const [state,setState] = useState({
    username:'',
    password:'',
    mailid:'',
    confirm_password:'',
    loader:false,
    signup:false,
  })
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    setLoading(false)
  })

  const changeValue=(e)=>{
    setState({...state,[e.target.name]:e.target.value})
  }

  const login=()=>{
    loginRoute({username:state.username,password:state.password})
    .then(res=>{
      if(res.message === "Login Success")
      {
        localStorage.setItem("jwt", JSON.stringify(res));
        alert('Logged In')
      }
      else if(res.status_code === 404 || res.status_code === 401)
      {
        alert(res.err_message)
      }
    })
    .catch(err=>{
      alert('Somethin went wrong !')
    })
  }

  const signUp=()=>{
    signupRoute({username:state.username,password:state.password})
    .then(res=>{
      if(res.status === 200)
      {
        alert('Signed Up')
      }
      else if(res.status_code === 404 || res.status_code === 401 || res.status_code === 406)
      {
        alert(res.err_message)
      }
    })
    .catch(err=>{
      alert('Somethin went wrong !')
    })
  }


  function checkValidWordCase(input_array, incoming_word){
          if (!input_array || !input_array.length) return 0;

          function checkAvailability(bi, i, j) {
              if (i < 0 || j < 0 || i > input_array.length - 1 || j > input_array[i].length - 1 || input_array[i][j] !== incoming_word[bi])
                  return false;

              if (bi === incoming_word.length - 1) return true;

              return checkAvailability(bi+1, i-1, j) ||   //backtracking left || backtracking right || backtracking top || backtracking down
                      checkAvailability(bi+1, i, j-1) ||
                      checkAvailability(bi+1, i+1, j) ||
                      checkAvailability(bi+1, i, j+1);
          }

          for (var i = 0;i < input_array.length;i++) {
              for (var j = 0;j < input_array[i].length;j++) {
                  if (checkAvailability(0, i, j))
                      return true;
              }
          }

          return false;
      }


if (loading) {
  return(
    <>Loading ...</>
  )
}
 else {
  return(
    <>
     {!state.signup ?
       <>
       <Grid container spacing={1}>
          <Grid item xs={4} sm={4} lg={4} />
          <Grid item xs={4} sm={4}>
            <Paper elevation={3} style={{padding:'10px'}}>
              <TextField value={state.username} fullWidth name={"username"} label={"Enter usename"} variant="outlined" onChange={changeValue} /><br /><br />
              <TextField value={state.password} fullWidth type="password" name={"password"} label={"Enter password"} variant="outlined" onChange={changeValue} /><br /><br />
              <Button fullWidth variant="contained" color="secondary" onClick={login}>LOGIN</Button><br /><br />
              <Button fullWidth onClick={()=>setState({...state,signup:true})} color="secondary">SIGNUP</Button>
            </Paper>
          </Grid>
          <Grid item xs={4} sm={4}></Grid>
       </Grid>
       </>
        :
        <>
        <Grid container spacing={1}>
           <Grid item xs={4} sm={4}></Grid>
           <Grid item xs={4} sm={4}>
           <Paper elevation={3} style={{padding:'10px'}}>
             <TextField value={state.username} fullWidth name={"username"} label={"Enter usename"} variant="outlined" onChange={changeValue} /><br />
             <TextField value={state.password} fullWidth type="password" name={"password"} label={"Enter password"} variant="outlined" onChange={changeValue} /><br />
             <TextField value={state.confirm_password} fullWidth type="password" name={"confirm_password"} label={"Re Enter password"} variant="outlined" onChange={changeValue} /><br />
             <Button fullWidth variant="contained" disabled={state.password!==state.confirm_password} color="secondary" onClick={signUp}>SIGNUP</Button><br/> <br />
             <Button fullWidth onClick={()=>setState({...state,signup:false})} color="secondary">SIGNIN</Button>
           </Paper>
           </Grid>
           <Grid item xs={4} sm={4}></Grid>
        </Grid>
        </>
     }
    </>
  )
    }
}

export default MainPage;
