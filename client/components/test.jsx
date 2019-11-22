import React from 'react';
import { connect } from 'react-redux';
import { getTestList } from '../actions';

class Test extends React.Component {

    componentDidMount(){
        this.props.getTestList();
    }

    generateTestlist(){
        return(
            this.props.list.map(element =>{
            <h1>{element}</h1>
            })
        );
    }

    render(){
        console.log('Props:', this.props);

        return (
            <div className="pt-4">
                <h1 className="pt-4">This is a test Component</h1>
                {this.generateTestlist()}
            </div>
        );
    }
}

function mapStateToProps(state){
    // console.log('Redux State:', state);

    return {
        list: state.test.list
    }
}

export default connect(mapStateToProps, {getTestList})(Test);

