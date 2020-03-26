import React, {createRef} from 'react'
import {createPortal} from 'react-dom'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

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

      this.inputRef = createRef()
  }

  componentDidMount(){
    console.log('Checkout component props: ', this.props)
  }

  
  onChange(e) {
    this.props.inputValue += e.target.value
  }
  
  onSubmit(e) {
    e.preventDefault()
    console.log('modal on submit hit')
  }
  
  render () {
    // let [show] = useState(false)
    return createPortal(
      // <div className="pt-8" onClick={this.props.onClick}>
        <div className="modal--overlay">
          <div className="modal-c">
            <h1>Insert a new value</h1>
            <form action="?" onSubmit={this.onSubmit}>
              <input
                ref={this.inputRef}
                type="text"
                onChange={this.onChange}
                value={5}
              />
              <button>Save new value</button>
            </form>
          </div>
        </div> 
      // </div>
      // document.getElementById("modal-root"),
      // <React.Fragment>
      //   <div className="pt-8">THIS IS THE bigOLDIv Checkout</div>
      //   <Modal
      //     // {...this.props}
      //     show={show}
      //     size="lg"
      //     aria-labelledby="contained-modal-title-vcenter"
      //     centered
      //     >
      //     <Modal.Header closeButton>
      //       <Modal.Title id="contained-modal-title-vcenter">
      //         Modal heading
      //       </Modal.Title>
      //     </Modal.Header>
      //     <Modal.Body>
      //       <h4>Centered Modal</h4>
      //       <p>
      //         Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
      //         dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
      //         consectetur ac, vestibulum at eros.
      //       </p>
      //     </Modal.Body>
      //     <Modal.Footer>
      //       <button 
      //         className="btn btn-dark"
      //         // onClick={props.onHide}
      //       >
      //         Close
      //       </button>
      //     </Modal.Footer>
      //   </Modal>
        // {/* <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        //   <div className="modal-dialog modal-dialog-centered" role="document">
        //     <div className="modal-content">
        //       <div className="modal-header">
        //         <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
        //         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        //           <span aria-hidden="true">&times;</span>
        //         </button>
        //       </div>
        //       <div className="modal-body">
        //         ...
        //       </div>
        //       <div className="modal-footer">
        //         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        //         <button type="button" className="btn btn-primary">Save changes</button>
        //       </div>
        //     </div>
        //   </div>
        // </div> */}
      // </React.Fragment> 
      ,document.getElementById("modal-root")
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
