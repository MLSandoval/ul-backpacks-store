import React, {createRef} from 'react'
import {createPortal} from 'react-dom'

import {Link, Route} from 'react-router-dom'

import { connect } from 'react-redux'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './styles/modalShell_style.css'
import Checkout from './checkout.jsx'
import ThankYou from './thank_you.jsx'
import ContinueShopping from './continue_shopping.jsx'

import {setModalConfig, computeCartTotal} from '../actions'

class ModalShell extends React.Component {
  constructor (props) {
      super(props)

      this.inputRef = createRef()
  }

  generateModalContent(){
    // console.log('generateModalContent called, path.includes("modal/checkout"): ', this.props.location.pathname.includes('modal/checkout'))
    // console.log('generateModalContent called, path.includes("modal/thankyou"): ', this.props.location.pathname.includes('modal/thankyou'))
    // console.log('generateModalContent called, path.includes("modal/continue-shopping"): ', this.props.location.pathname.includes('modal/continue-shopping'))

    switch(true){
      case this.props.location.pathname.includes('modal/checkout'):
        this.props.setModalConfig({
          header:'Checkout',
          content: <Checkout/>,
          orderCost: `$ ${this.props.totalOrderCost.toFixed(2)}`
        })
        break
      case this.props.location.pathname.includes('modal/thank-you'):
        this.props.setModalConfig({
          header:'Thank You!',
          content: <ThankYou/>,
          orderCost: ``
        })
        break
      case this.props.location.pathname.includes('modal/continue-shopping'):
        this.props.setModalConfig({
          header:'Continue Shopping?',
          content: <ContinueShopping/>,
          orderCost: `Cart Total: $${this.props.totalOrderCost.toFixed(2)}`
        })
        break
      default: console.log('Modal Content Error.')
    }
    // console.log('this.props.MODALCONFIG: ', this.props.modalConfig)
  }

  handleOnHide(){
    if(this.props.modalConfig.header === "Thank You!"){
      this.props.history.go(-2)
    }else{
      this.props.history.goBack()
    }
    
  }

  componentDidMount(){
    // console.log('props in MOdalShell componenet: ', this.props)
    this.props.computeCartTotal()
    this.generateModalContent()
  }

  render () {
    // console.log('render modal shell, props: ', this.props)
    const {to, staticContext, ...rest} = this.props
    return (
      <div>
        <Modal
          // {...rest}
          className="modal-add"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={true}
          backdrop={true}
          onHide={()=>{console.log('this is onHide fnc'); this.handleOnHide() }}
        >
          <Modal.Header className="modal-header">
            <Modal.Title className="w-100 row justify-content-between modal-title" id="contained-modal-title-vcenter">
              <div className="col-6">
                {this.props.modalConfig.header}  
              </div>
              <div className="col-6">
                {`${this.props.modalConfig.orderCost}` || ''}
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
          {this.props.modalConfig.content}
        </Modal>
      </div>
    )
  }
}

function mapStateToProps (state) {
  // console.log('state in ModalShell component: ', state);
  return {
    // this becomes a property inside of the props of this component
    view: state.view,
    cart: state.cart,
    checkoutFormData: state.checkoutFormData,
    totalOrderCost: state.totalOrderCost,
    currentProduct: state.currentProduct,
    modalConfig: state.modalConfig
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // onViewChangeClick: view => {
    //   // dispatch(SET_VIEW(view));
    // }
  }
}


export default connect(mapStateToProps, {setModalConfig, computeCartTotal})(ModalShell)
