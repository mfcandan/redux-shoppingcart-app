import React, { Component } from "react";
import * as cartActions from "../../redux/actions/cartActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Table, Button } from "reactstrap";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";

class CartDetail extends Component {
  removeFromCart = (product) => {
    this.props.actions.removeFromCart(product);
    alertify.error(product.productName + " sepetten silindi");
  };

  renderEmpty() {
    return (
      <div style={{ textAlign: "center", marginTop: "5em" }}>
        <h5>Your Cart is Empty :(</h5>
      </div>
    );
  }

  renderCartDetail() {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {this.props.cart.map((cartItem) => (
            <tr key={cartItem.product.id}>
              <td scope="row">
                <b>{cartItem.product.id}</b>
              </td>
              <td>{cartItem.product.productName}</td>
              <td>{cartItem.product.unitPrice}</td>
              <td>{cartItem.quantity}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() => this.removeFromCart(cartItem.product)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  render() {
    return (
      <div>
        <h3>Your Cart Detail:</h3>
        {this.props.cart.length > 0
          ? this.renderCartDetail()
          : this.renderEmpty()}
        <Link
          to={"/"}
          style={{
            color: "black",
            display: "flex",
            justifyContent: "center",
            marginTop: "2em",
          }}
        >
          {"<= "}
          Go back to homepage.
        </Link>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
