import React from 'react';
import { connect } from 'tls';

class Checkout extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <h1>THIS IS THE CHECKOUT VIEWWWW</h1>
        );
    }
}

mapDispatchToProps(){};
mapStateToProps(){};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);