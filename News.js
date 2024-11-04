import React, { Component } from 'react'
import NewsItem from './NewsItem'
export class News extends Component {
  
   constructor(){
    super();
    this.state= {
       articles: [],
       loading: false,
       page:1
      

    }  
  }
  async componentDidMount(){
    let url ="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=de7e56869d794206ae4ea1a18f3ae9f9";
    let data= await fetch(url);
    let parsedData= await data.json()
    console.log(parsedData)
    this.setState({articles:parsedData.articles, totalResults: parsedData.totalResults})
  }
  
  handlePreClick= async()=>{
  console.log("Previous")
  let url =`https://newsapi.org/v2/everything?q=apple&from=2024-10-17&to=2024-10-17&sortBy=popularity&apiKey=de7e56869d794206ae4ea1a18f3ae9f9=${this.state.page-1}$pageSize=20`;
    let data= await fetch(url)
    let parsedData= await data.json()
    console.log(parsedData)
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false
    })
  }
   handleNextClick= async()=>{
    console.log("Next");
    if ( !(this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize))){
    }
    else{
    let url = `https://newsapi.org/v2/everything?q=apple&from=2024-10-17&to=2024-10-17&sortBy=popularity&apiKey=de7e56869d794206ae4ea1a18f3ae9f9=${this.state.page+1}$pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url)
    let parsedData= await data.json()
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading:false
    })
   }
  }

  render() {
    
    return (
      <div className="container my-3">
        <h1 className="text-center"> NewsMonkey - Top Headlines</h1>
        
        <div className="row" >
        {this.state.articles.map((element)=>{
         return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div>
        })}
        </div>
        <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark"onClick={this.handlePreClick}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}> Next &rarr;</button>

        </div>
     </div>
    )
  }
}


export default News
