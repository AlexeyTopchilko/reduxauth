import React from 'react';


class WeatherDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }

  componentDidMount() {
    const URL = "http://localhost:22948/Weather";
    let token = localStorage.getItem('token');
    fetch(URL, {
      headers: { authorization: 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ weatherData: json });
      })
  };
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>You should logged in to get access to weather</div>;
    return <div>{JSON.stringify(weatherData)}</div>;
  }
}

export default WeatherDisplay;