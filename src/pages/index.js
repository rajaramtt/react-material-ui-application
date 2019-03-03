import React from 'react';
import PropTypes, { string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import withRoot from '../withRoot';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    flexGrow: 1,
    overflow: 'hidden',
    margin: `${theme.spacing.unit * 3}px`,

  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  card: {
    maxWidth: 200,
  },
  media: {
    objectFit: 'cover',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

// const restAPI = 'https://wjbzz6kwj6.execute-api.us-east-1.amazonaws.com/api/';
const restAPI = 'https://api.myjson.com/bins/1ehoba';

class TextFields extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: {},
      captcha: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ captcha: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.captcha){
      alert('Captcha Value:'+ this.state.captcha);
    } else  {
      alert('Please enter Captcha Value');
    }

  }

  componentDidMount() {

    fetch(restAPI)
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({
            isLoaded: true,
            data: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  render() {
    const { classes } = this.props;
    const { error, isLoaded, data } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                  Rajaram's React POC
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
          <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <div>
              <Typography gutterBottom variant="h5" component="h2">
                Captcha Form
              </Typography>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={classes.media}
                    height="70"
                    image={data.captcha_img_url}
                    title="Captcha Image"
                  />
                </CardActionArea>
              </Card>
            </div>
            <div>
              <TextField
                id="captchaValue"
                label="Captcha Value"
                className={classes.textField}
                margin="normal"
                value={this.state.captcha}
                onChange={this.handleChange}
              />
            </div>
            <Button type="submit"  variant="contained" color="primary" className={classes.button}>
              Submit
            </Button>
          </form>
        </div>
      );
    }
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withRoot(withStyles(styles)(TextFields));

