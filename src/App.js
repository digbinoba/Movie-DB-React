import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'
class App extends Component {
  constructor(props){
    super(props)
    this.state =  {}
    console.log("This is my initializer")

    // const movies = [
    //   {id: 0, poster_src: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", title: "Avengers: Infinity War", overview: "Thanos is a bad guy"},
    //   {id: 1, poster_src: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/cezWGskPY5x7GaglTTRN4Fugfb8.jpg" , title: "The Avengers", overview: "Thanos is a bad guy again. He gets infinity stones"}
    // ]

    // var movieRows = []
    // movies.forEach((movie) => {
    //   console.log(movie.title)
    //   const movieRow = <MovieRow movie={movie}/>      
    //   movieRows.push(movieRow)
    // })
    // this.state = {rows: movieRows}
    this.performSearch("")
  }

  performSearch(searchTerm){
    console.log("perform search using moviedb")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data Successfully")
        const results = searchResults.results
        
        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          //console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })
        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }      
    })
  }
  searchChangedHandler(event){
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }
  render() {
    return (
      <div>
       
       <table className="titleBar">
         <tbody>
          <tr>
            <td><img alt="app_icon" width="50" src="green_app_icon.svg"/></td>
            <td width="8"></td>
            <td><h1>Movies DB Search</h1></td>
          </tr>
           </tbody>
         </table>

        <input style={{
          fontSize:24,
          display:'block',
          width: "99%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} onChange={this.searchChangedHandler.bind(this)} placeholder="Enter Movie name"/>

        {this.state.rows}
      </div>
    );
  }
}

export default App;
