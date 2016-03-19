import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  constructor(props){
    super(props);
    this.state={
      submittingForm: false,
    }
  }
  static contextTypes = {
    router: PropTypes.object,
  };

  render(){
    const { fields: { title, categories, content },
            handleSubmit } = this.props;
    return (
      <form onSubmit={ handleSubmit(this.onSubmitForm) }>
        <h3>Create a New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger': ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>
        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger': ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories}/>
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>
        <div className={`form-group ${content.touched && content.invalid ? 'has-danger': ''}`}>
          <label>Content</label>
          <textarea className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>
        <button
          disabled={this.state.submittingForm}
          type="submit"
          className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    )
  }
  //auto bind this
  onSubmitForm = (props) => {
    this.setState({
      submittingForm: true,
    });
    this.props.createPost(props)
      .then(()=> {
        //blog post created, navigate to index
        this.context.router.push('/');
      });
  }
}

function validate(values){
  const errors ={};
  if(!values.title){
    errors.title='Enter a title';
  }
  if(!values.categories){
    errors.categories='Enter one or more categories';
  }
  if(!values.content){
    errors.content='Enter some content';
  }
  return errors;
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({createPost:createPost}, dispatch);
};

export default reduxForm({
  form: 'PostsNewForm',
  fields: [
    'title',
    'categories',
    'content',
  ],
  validate: validate,
}, null, mapDispatchToProps)(PostsNew);
