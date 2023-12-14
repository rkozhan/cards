import { Component } from "react";
import { connect } from "react-redux";

class WordPage extends Component {
    render () {
        const {cardItems, selectedWordId} = this.props;
        console.log(selectedWordId);
    
        return (
            <div>
                {selectedWordId}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cardItems: state.cards,
        selectedWordId: state.selectedWordId
    }
}

export default connect()(WordPage);