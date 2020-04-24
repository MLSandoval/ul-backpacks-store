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

import {setModalConfig} from '../actions'

class ModalShell extends React.Component {
  constructor (props) {
      super(props)

      this.inputRef = createRef()
  }

  autoRedirect(){

    setTimeout(()=>{this.props.history.push( '/')}, 5000)

    console.log('modal shell, autoRedirect called')

  }

  generateModalContent(){
    console.log('generateModalContent called, path.includes("modal/checkout"): ', this.props.location.pathname.includes('modal/checkout'))
    console.log('generateModalContent called, path.includes("modal/thankyou"): ', this.props.location.pathname.includes('modal/thankyou'))
    console.log('generateModalContent called, path.includes("modal/continue-shopping"): ', this.props.location.pathname.includes('modal/continue-shopping'))

    switch(true){
      case this.props.location.pathname.includes('modal/checkout'):
        this.props.setModalConfig({
          header:'Checkout',
          content: <Checkout/>,
          orderCost: `$ ${this.props.totalOrderCost.toFixed(2)}`
        })
        // this.state.modalHeader = 'Checkout'
        // this.state.orderCost = `$ ${this.props.totalOrderCost.toFixed(2)}`
        // return <Checkout/>
      case this.props.location.pathname.includes('modal/thankyou'):
        this.props.setModalConfig({
          header:'Thank You!',
          content: <ThankYou/>,
          orderCost: ``
        })
        // this.state.modalHeader = 'Thank you!'
        // this.state.orderCost = ''
        // this.autoRedirect()
        // return <ThankYou/>
        break
      case this.props.location.pathname.includes('modal/continue-shopping'):
        this.props.setModalConfig({
          header:'Continue Shopping?',
          content: <ContinueShopping/>,
          orderCost: `$ ${this.props.totalOrderCost.toFixed(2)}`
        })
        // this.state.modalHeader = 'Continue shopping?'
        // this.state.orderCost = `$ ${this.props.totalOrderCost.toFixed(2)}`
        // return <ContinueShopping/>
        break
      default: console.log('Modal Content Error.')
    }
    console.log('this.props.MODALCONFIG: ', this.props.modalConfig)
  }

  populateModal(){
    return this.modalContent
  }

  componentDidMount(){
    // console.log('ModalShell component mounted, props: ', this.props)
    this.generateModalContent()
    // console.log('modal did mount this.modalContent: ', this.modalContent)
    // console.log('modal did mount this.header: ', this.modalHeader)
  }
  // componentDidUpdate(){
  //   // console.log('modalShell component did update, generate modal content called again')
  //   this.generateModalContent()
  //   // console.log('modal did mount this.modalContent: ', this.modalContent)
  //   // console.log('modal did mount this.header: ', this.modalHeader)
  // }
  
  render () {
    // console.log('this.modalContent: ', this.modalContent)
    // console.log('this.header: ', this.modalHeader)
    // console.log('MODAL RENDER CALLED, this.modalheader: ', this.props.modalConfig.header)
    // let [show] = useState(false)
    console.log('render modal shell, props: ', this.props)
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
        >
          <Modal.Header closeButton className="modal-header">
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
          {/* <Checkout/> */}
         
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


export default connect(mapStateToProps, {setModalConfig})(ModalShell)
