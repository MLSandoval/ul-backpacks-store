import React, {createRef} from 'react'
import {createPortal} from 'react-dom'

import {Link, Route} from 'react-router-dom'

import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './styles/modalShell_style.css'
import Checkout from './checkout.jsx'
import ThankYou from './thank_you.jsx'



class ModalShell extends React.Component {
  constructor (props) {
      super(props)

      this.inputRef = createRef()

      this.modalContent = null
      this.modalHeader = null
      this.orderCost = null
  }

  generateModalContent(){
    console.log('generateModalContent called, path.includes("modal/checkout"): ', this.props.location.pathname.includes('modal/checkout'))
    console.log('generateModalContent called, path.includes("modal/thankyou"): ', this.props.location.pathname.includes('modal/thankyou'))

    switch(true){
      case this.props.location.pathname.includes('modal/checkout'):
        this.modalContent = <Checkout/>
        this.modalHeader = 'Checkout'
        this.orderCost = `$ ${this.props.totalOrderCost}`
        break
      case this.props.location.pathname.includes('modal/thankyou'):
        this.modalContent = <ThankYou/>
        this.modalHeader = 'Thank you!'
        this.orderCost = ''
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
  componentDidUpdate(){
    console.log('modalShell component did update, generate modal content called again')
    this.generateModalContent()
  }
  
  render () {
    // let [show] = useState(false)
    console.log('render modal shell, props: ', this.props)
    const {to, staticContext, ...rest} = this.props
    return (
      <div>
        <Modal
        // {...rest}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        >
          <Modal.Header>
            <Modal.Title className="w-100 row justify-content-between" id="contained-modal-title-vcenter">
              <div className="col-6">
                {this.modalHeader}  
              </div>
              <div className="col-6">
                {`${this.orderCost}` || ''}
              </div>
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
          {/* <Checkout/> */}
          <Modal.Footer>
            {/* <Button 
            // onClick={props.onHide}
            >Close</Button> */}
          </Modal.Footer>
        </Modal>
        
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log('state in ModalShell component: ', state);
  return {
    // this becomes a property inside of the props of this component
    view: state.view,
    cart: state.cart,
    checkoutFormData: state.checkoutFormData,
    totalOrderCost: state.totalOrderCost
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
