import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';

class Checkout extends React.Component {
  // constructor (props) {
  //     super(props);
  // }

  render () {
    return (
      <div className="">
        <h1>THIS IS THE CHECKOUT VIEWWWW</h1>
        <h1>THIS IS THE CHECKOUT VIEWWWW</h1>
        <h1>THIS IS THE CHECKOUT VIEWWWW</h1>
        <h1>THIS IS THE CHECKOUT VIEWWWW</h1>
        <h1>THIS IS THE CHECKOUT VIEWWWW</h1>
        <h1>THIS IS THE CHECKOUT VIEWWWW</h1>
        <h1>THIS IS THE CHECKOUT VIEWWWW</h1>
        <h1>THIS IS THE CHECKOUT VIEWWWW</h1>
        <h1>THIS IS THE CHECKOUT VIEWWWW</h1>
        <h1>THIS IS THE CHECKOUT VIEWWWW</h1>
        <h1>THIS IS THE CHECKOUT VIEWWWW</h1>
      </div>
      
    )
  }
}

function mapStateToProps (state) {
  // console.log('Redux state in Clock Component: ', state);
  return {
    // this becomes a property inside of the props of this component
    view: state.view
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // onViewChangeClick: view => {
    //   // dispatch(SET_VIEW(view));
    // }
  }
}

const test = () => {

}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
