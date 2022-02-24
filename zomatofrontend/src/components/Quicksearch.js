import React, { Component } from 'react'
import MealTypeItem from './MealTypeItem'

export default class Quicksearch extends Component {
    constructor(){
        super()
        this.state={
            mealType:[]
        }
    }

    componentDidMount(){
        fetch(`http://localhost:8080/edumato/mealtype`,{method:'GET'}).then(response=>response.json()).then(data=>this.setState({mealType:data.data}))
    }

    render() {
        let quickSearchList=this.state.mealType.length && this.state.mealType.map((item)=>
        <MealTypeItem item={item} key={item.name} ></MealTypeItem>)
        return (
            <div>
            <div className="quicksearch">
                <p className="quicksearchHeading">
                    Quick Searches
                    </p>
                <p className="quicksearchSubHeading">
                    Discover restaurants by type of meal
                    </p>
                <div className="container-fluid">
                    <div className="row">
                       
                      {quickSearchList}
                        </div>
                    </div>
                </div>
            </div>
       
        )
    }
}


            


