import React, { Component } from "react";
import axios from "axios";
import Modal from "./Modal/modal/modal";

const ErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
      state = {
          error: null
      }

      componentWillMount () {
          this.reqInterceptor = axios.interceptors.request.use(req => {
              this.setState({error: null});
              return req;
          });
          this.resInterceptor = axios.interceptors.response.use(res => res, error => {
            this.setState({error: error.message});
          });
      }

      componentWillUnmount () {
          axios.interceptors.request.eject(this.reqInterceptor);
          axios.interceptors.response.eject(this.resInterceptor);
      }
      
      errorConfirmedHandler = () => {
          this.setState({error: false})
      }

      render() {
          return (
              <>
                  { this.state.error ? <Modal
                //   clicked={this.errorConfirmedHandler}
                  show={this.state.error}>
                      {this.state.error ? `${this.state.error}... reload page!` : null}
                  </Modal> : null }
                  <WrappedComponent {...this.props} />
              </>
          );
      }
  }
}

export default ErrorHandler;
