var SampleComponent = React.createClass({
    render: function() {
        return (
            <div>
             <h3>This is a sample testing component</h3>
             <p>The title prop you passed is: {this.props.title}</p>
            </div>
        );
    }
});
module.exports = SampleComponent;