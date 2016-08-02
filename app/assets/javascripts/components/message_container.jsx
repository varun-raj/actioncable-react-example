var MessageContainer = React.createClass({
		getInitialState: function() {
		    return {
		        message: {},
		        comments: [],  
		    };
		},

		getElementIndex: function(id) {
			for (var i = 0; i < this.state.comments.length; i++) {
			    if (this.state.comments[i].id == id) {
			      return i;
			    }
			  }
			return -1;
		},

		componentDidMount: function() {
			this.fetchData();
	  },

	  componentDidUpdate: function(prevProps, prevState) {
	      if (this.state.message.id && this.state.message != prevState.message.id) {
			    this.setupSubscription();  	
	      }  
	  },

	  fetchData: function() {
	  	$.ajax({
				url: this.props.url,
				method: "GET",
				dataType: 'json',
				success: function(data) {
					this.setState({
						comments: data.comments,
						message: data.message,
					})
				}.bind(this)
			});
	  },


		handleSubmit: function(event) {
			event.preventDefault();
			var data = {comment: {content: this.refs.content.value}, message_id: this.state.message.id};

			$.ajax({
				url: this.props.post_url,
				method: "post",
				dataType: 'json',
				data: data,
				success: function(data) {
					this.state.comments.push(data.comment);
					this.setState({
						comments: this.state.comments,
					})
				}.bind(this)
			});
		},


		setupSubscription: function(){
		  App.comments = App.cable.subscriptions.create("CommentsChannel", {
		    message_id: this.state.message.id,

		    connected: function () {
		    	console.log("Connected");
		      setTimeout(() => this.perform('follow',
		                                    { message_id: this.message_id}), 1000 );
		    },

		    received: function (data) {
		      this.updateCommentList(data.comment);
		    },

		    updateCommentList: this.updateCommentList

		    });
		},

		updateCommentList: function(comment) {
			var index = this.getElementIndex(comment.id);
			if (index == -1) {
				this.state.comments.push(comment);
				this.setState({
					comments: this.state.comments
				})				
			}
		},


    render: function() {
    	var showComments = function showComments(comment) {
    		return <article key={comment.id}>
							  <b>{comment.user.name}: </b><p>{comment.content}</p>
							</article>
    	}.bind(this);

        return (
            <div>
            	<h3>{this.state.message.title}</h3>
            	{this.state.comments.map(showComments)}
            	<form  onSubmit={this.handleSubmit}>
            		<textarea ref="content"></textarea>
            		<input type="submit"/>
            	</form>
            </div>
        );
    }
});

module.exports = MessageContainer;