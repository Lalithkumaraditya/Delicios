import React, { Fragment, Component } from "react";
import axios from '../../axios';
import Modal from "../../Components/UI/Modal/Modal";
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
        error: null,
      };
    componentWillMount() {
       
      this.reqInterceptor=axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor=axios.interceptors.response.use(res => res, (error) => {
        this.setState({ error: error });
      });
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    componentWillUnmount(){
   axios.interceptors.request.eject(this.reqInterceptor);
   axios.interceptors.request.eject(this.resInterceptor);

    }
    render() {
      return (
        <React.Fragment>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null }
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};
export default withErrorHandler;
