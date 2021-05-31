import { AppBar, Badge, IconButton, Slide } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Slogo from "./Slogo.png";

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      fetching: true,
      username: "",
      menu_open: false,
      anchorEl: null,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    axios.get(this.props.get).then((response) => {
      if (response.data.user) {
        this.setState({
          fetching: false,
          username: response.data.user.username,
        });
      } else {
        this.setState({
          fetching: false,
        });
      }
    });
  }
  logout = (event) => {
    event.preventDefault();
    this.setState({
      snack_open: true,
      snack_msg: "Logging Out....!!",
      alert_type: "info",
    });
    axios
      .post(this.props.logout)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loggedIn: false,
            username: null,
            redirectTo: "/",
          });
        }
      })
      .catch((error) => {
        this.setState({
          snack_open: true,
          snack_msg: "Something Went Wrong !!",
          alert_type: "error",
        });
      });
  };

  handleExpand = (e) => {
    this.setState({
      menu_open: !this.state.menu_open,
      anchorEl: e.currentTarget,
    });
  };
  render() {
    if (this.state.fetching) {
      return <div>Loading</div>;
    } else {
      if (this.state.redirectTo) {
        return <Redirect to={{ pathname: this.state.redirectTo }} />;
      } else {
        let checked = true;
        return (
          <React.Fragment>
            <Slide
              direction="down"
              in={true}
              {...(checked ? { timeout: 700 } : {})}
            >
              <AppBar position="fixed" style={{ backgroundColor: "#009688" }}>
                <Toolbar>
                  {!this.state.username ? (
                    <Grid container spacing={1}>
                      <Grid item xs={3} sm={2}>
                        <Hidden xsDown>
                          <img
                            src={Slogo}
                            className="srm"
                            alt="SRM Institute of Science and Technology"
                            title="SRM Institute of Science and Technology"
                          />
                        </Hidden>
                      </Grid>
                      <Hidden smUp>
                        <Grid item xs={6} sm={8}>
                          <div
                            style={{
                              textAlign: "center",
                              marginTop: "5px",
                              fontFamily: "Cinzel",
                              fontSize: "30px",
                            }}
                          >
                            ESEAT
                          </div>
                        </Grid>
                      </Hidden>
                      <Hidden xsDown>
                        <Grid item xs={6} sm={8}>
                          <div
                            style={{
                              textAlign: "center",
                              marginTop: "5px",
                              fontFamily: "Cinzel",
                              fontSize: "30px",
                            }}
                          >
                            Seating Management System
                          </div>
                        </Grid>
                      </Hidden>
                      <Grid item xs={3} sm={2} />
                    </Grid>
                  ) : (
                    <Grid container spacing={0}>
                      <Hidden smUp>
                        <Grid item xs={3} sm={4}>
                          <IconButton
                            onClick={this.renderSlide}
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                          >
                            <MenuIcon />
                          </IconButton>
                        </Grid>
                      </Hidden>

                      <Hidden xsDown>
                        <Grid item xs={3} sm={4}>
                          <img
                            src={Slogo}
                            className="srm"
                            alt="SRM Institute of Science and Technology"
                            title="SRM Institute of Science and Technology"
                          />
                        </Grid>
                      </Hidden>

                      <Grid item xs={6} sm={4}>
                        <div
                          style={{
                            textAlign: "center",
                            marginTop: "5px",
                            fontFamily: "Cinzel",
                            fontSize: "30px",
                          }}
                        >
                          ESEAT
                        </div>
                      </Grid>
                      <Grid item xs={3} sm={4}>
                        <div style={{ float: "right", paddingTop: "5px" }}>
                          {this.props.home && (
                            <Hidden xsDown>
                              <Link to={this.props.home}>
                                <IconButton
                                  style={{ color: "white" }}
                                  aria-label="show 4 new mails"
                                >
                                  <HomeIcon />
                                </IconButton>
                              </Link>
                            </Hidden>
                          )}
                          <Hidden xsDown>
                            <IconButton
                              onClick={this.logout}
                              aria-label="show 4 new mails"
                              color="inherit"
                            >
                              <ExitToAppIcon />
                            </IconButton>
                          </Hidden>
                          <IconButton
                            aria-label="show 17 new notifications"
                            color="inherit"
                          >
                            <Badge
                              badgeContent={this.state.count_noti}
                              color="secondary"
                            >
                              <NotificationsActiveIcon />
                            </Badge>
                          </IconButton>
                          {this.props.home && (
                            <Hidden xsDown>
                              <IconButton
                                aria-label="settings"
                                onClick={this.handleExpand}
                              >
                                <MoreVertIcon style={{ color: "white" }} />
                                <Menu
                                  anchorEl={this.state.anchorEl}
                                  anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                  }}
                                  keepMounted
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                  }}
                                  open={this.state.menu_open}
                                  onClose={(e) => this.handleExpand(e)}
                                >
                                  <Link
                                    style={{ textDecoration: "none" }}
                                    to={"/etest/dashboard"}
                                  >
                                    <MenuItem>Dashboard</MenuItem>
                                  </Link>
                                  <Link
                                    style={{ textDecoration: "none" }}
                                    to={"/etest/add_question"}
                                  >
                                    <MenuItem>Add Questions</MenuItem>
                                  </Link>
                                </Menu>
                              </IconButton>
                            </Hidden>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  )}
                </Toolbar>
              </AppBar>
            </Slide>
          </React.Fragment>
        );
      }
    }
  }
}
