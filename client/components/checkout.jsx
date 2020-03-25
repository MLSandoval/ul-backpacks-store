import React from 'react'
import {createPortal} from 'react-dom'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

class Checkout extends React.Component {
  constructor (props) {
      super(props)
      this.modalStyle = {
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,.2)",
        color: "##FFF",
        fontSize: "40px",
      }
  }

  componentDidMount(){
    console.log('Checkout component props: ', this.props)
  }
  
  render () {
    return createPortal(
      <div className="container pt-8" style={this.modalStyle} onClick={this.props.onClick}>
        {this.props.children}
        this is checkout component boi 
      </div>,
      document.getElementById("modal-root"),
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
