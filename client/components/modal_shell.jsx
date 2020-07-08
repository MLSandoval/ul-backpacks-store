import React from 'react'
import { connect } from 'react-redux'

import {setModalConfig, computeCartTotal} from '../actions'

import './styles/modalShell_style.css'
import Checkout from './checkout.jsx'
import ThankYou from './thank_you.jsx'
import ContinueShopping from './continue_shopping.jsx'
import Modal from 'react-bootstrap/Modal'

class ModalShell extends React.Component {
  generateModalContent(){
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
          orderCost: ``
        })
        break
      default: console.error('Modal Content Error.')
    }
  }

  handleOnHide(){
    if(this.props.modalConfig.header === "Thank You!"){
      this.props.history.push('/')
    }else{
      this.props.history.goBack()
    }
  }

  componentDidMount(){
    this.props.computeCartTotal(this.props.cart.cart_items, this.props.products)
    this.generateModalContent()
  }
  componentDidUpdate(){
    this.props.computeCartTotal(this.props.cart.cart_items, this.props.products)
  }
  componentWillReceiveProps(){
    this.props.computeCartTotal(this.props.cart.cart_items, this.props.products)
  }

  render () {
    const {to, staticContext, ...rest} = this.props
    return (
      <div>
        <Modal
          className="modal-add"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={true}
          backdrop={true}
          onHide={()=>{this.handleOnHide() }}
        >
          <Modal.Header className="modal-header">
            <Modal.Title className="w-100 row justify-content-between modal-title" id="contained-modal-title-vcenter">
              <div className="col-6 no-wrap-white">
                {this.props.modalConfig.header}  
              </div>
              <div className="col-6 text-right">
                {`${this.props.modalConfig.orderCost}` || ''}
              </div>
            </Modal.Title>
          </Modal.Header>
          {this.props.modalConfig.content}
        </Modal>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    view: state.view,
    cart: state.cart,
    checkoutFormData: state.checkoutFormData,
    totalOrderCost: state.totalOrderCost,
    currentProduct: state.currentProduct,
    modalConfig: state.modalConfig,
    products: state.products
  }
}

export default connect(mapStateToProps, {setModalConfig, computeCartTotal})(ModalShell)