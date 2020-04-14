import React from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import axios from 'axios';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      query: '',
      similar: []
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    var config = {
      credentials: 'same-origin',
      withCredentials: true
    };

    if( value === '' ){
      this.setState({
        [name]: value,
        similar: []
      });
    }
    else {
      axios.get(`/getSimilar/`+value, config)
      .then(res => {
        this.setState({
          [name]: value,
          similar: res.data.similar
        });
      }).catch(e => {
        console.error(e)
      });
    }
  }

  render(){
    return (
      <div style={{ width: "90%", margin: "2%" }}>
        <AppBar  style={{ background: 'linear-gradient(90deg, rgba(35,77,32,1) 47%, rgba(240,247,218,1) 92%)' }}>
          <Toolbar>
            <Typography variant="h4" style={{"text-align": "center",  width: "100%"}}>FastText Trained With Glue Dataset</Typography>
          </Toolbar>
        </AppBar>
        <div style={{ width: "100%", padding: "1%" }}>
        <TextField label="Enter a word to find similarity" name="query" style={{ width: "98%", margin: "2%" }} margin="normal" variant="outlined" value={this.state.query} onChange={this.handleChange} />

        {
          this.state.similar.map((member, index) => {

          let backgroundGrad = 'linear-gradient(90deg, rgb(240,247,218) 0%, rgb(240,247,218) '+member[1]*100+'%)'

          if( member[1] > 0.85){
            backgroundGrad = 'linear-gradient(90deg, rgb(35,77,32) 0%, rgb(240,247,218) '+member[1]*100+'%)'
          }
          else if (member[1] > 0.7){
            backgroundGrad = 'linear-gradient(90deg, rgb(54,128,45) 0%, rgb(240,247,218) '+member[1]*100+'%)'
          }
          else if (member[1] > 0.6){
            backgroundGrad = 'linear-gradient(90deg, rgb(119,171,89) 0%, rgb(240,247,218) '+member[1]*100+'%)'
          }
          else if (member[1] > 0.5){
            backgroundGrad = 'linear-gradient(90deg, rgb(201,223,138) 0%, rgb(240,247,218) '+member[1]*100+'%)'
          }
          
          return (<Card key={index} style={{ width: "90%", margin: "2%" }}>
                    <table style={{ width: "100%"}}>
                      <tr style={{ width: "100%", margin: "2%" }}>
                        <td rowSpan={2} style={{ width: "5%", padding: "2%" }} >
                          <Typography variant="h5" component="h2">
                            {index + 1}
                          </Typography>
                        </td>
                        <td rowSpan={1} style={{ width: "95%", margin: "1%" }}>
                          <Typography style={{ fontSize: 14, background: backgroundGrad, color: 'white' }}  color="textSecondary" gutterBottom>
                            {member[1].toFixed(4) * 100}%
                          </Typography>
                        </td>
                      </tr>
                      <tr style={{ width: "100%", margin: "2%" }}>
                        <td rowSpan={1} style={{ width: "90%", margin: "1%" }}>
                          <Typography variant="h5" component="h2">
                            { member[0] }
                          </Typography>
                        </td>
                      </tr>
                    </table>
                  </Card> 
                  )
          })
        }
        </div>
      </div>
    );
  }
}

export default App;
