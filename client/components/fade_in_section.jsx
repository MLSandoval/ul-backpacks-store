import React, {useState} from 'react'
import {connect} from 'react-redux'

import './styles/fade_in_style.css'

function FadeInSection(props) {
  const [isVisible, setVisible] = useState(true)
  const domRef = React.useRef()
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting))
    })
    observer.observe(domRef.current)
    return () => observer.unobserve(domRef.current)
  }, [])
  
  return (
    <div className={`${props.classesPassed || ''} d-flex fade-in-section ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
      {props.children}
    </div>
  )
}

function mapStateToProps(state, ownProps){
  return {
    ...ownProps
  }
}

export default connect(mapStateToProps, null)(FadeInSection)