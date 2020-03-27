import React, {createRef} from 'react'
import {createPortal} from 'react-dom'

import {Link, Route} from 'react-router-dom'

import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './styles/modalShell_style.css'
import Checkout from './checkout.jsx'



class ModalShell extends React.Component {
  constructor (props) {
      super(props)

      this.inputRef = createRef()

      this.modalContent = null
      this.modalHeader = null
  }

  generateModalContent(){
    console.log('generateModalContent called, path.includes: ', this.props.location.pathname.includes('modal/checkout'))
    switch(true){
      case this.props.location.pathname.includes('modal/checkout'):
        this.modalContent = <Checkout/>
        this.modalHeader = 'Checkout'
        break
      default: console.log('Modal Content Error.')
    }
  }

  populateModal(){
    return this.modalContent
  }

  componentDidMount(){
    console.log('ModalShell component mounted, props: ', this.props)
    this.generateModalContent()
  }
  
  render () {
    // let [show] = useState(false)
    return (
      <div>
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.modalHeader}
          </Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body> */}
        {this.populateModal()}
        <Modal.Footer>
          <Button 
          // onClick={props.onHide}
          >Close</Button>
        </Modal.Footer>
      </Modal>
        {/* <Modal className="modal-overlay">
          {
            console.log('ModalSehll this.props.children: ', this.props.children)
          }
          {
            this.props.children
          }
          {
            this.populateModal()
          }
          <Modal.Footer>
            <div className="test">THIS IS THE DIV INSIDE MODAL TAG IN MODALSHELL BEFORE CHECKOUT</div>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal> */}
      {/* <Route path={`${this.props.match.url}/checkout`} component={Checkout}/> */}
      </div>
    )
    // document.getElementById('modal-root')
  }
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      {/* <Modal.Body>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body> */}
      {ModalShell.populateModal()}
      <Modal.Footer>
        <Button 
        // onClick={props.onHide}
        >Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

function mapStateToProps (state) {
  console.log('state in ModalShell component: ', state);
  return {
    // this becomes a property inside of the props of this component
    view: state.view,
    cart: state.cart
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // onViewChangeClick: view => {
    //   // dispatch(SET_VIEW(view));
    // }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalShell)
