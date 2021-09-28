import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { getProducts, saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail.js";
import alertify from "alertifyjs";

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});
  console.log(product);
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    ({ ...props.product });
  }, [props.product]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));

    validate(name, value);
  }

  function validate(name, value) {
    if (name === "productName" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "Product Name required*",
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "",
      }));
    }

    if (name === "categoryId" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        categoryId: "Category required*",
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        categoryId: "",
      }));
    }

    if (name === "unitPrice" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        unitPrice: "Unit Price required*",
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        unitPrice: "",
      }));
    }

    if (name === "quantityPerUnit" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        quantityPerUnit: "Quantity Per Unit required*",
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        quantityPerUnit: "",
      }));
    }

    if (name === "unitsInStock" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        unitsInStock: "Units In Stock required*",
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        unitsInStock: "",
      }));
    }
  }

  function handleSave(event) {
    console.log(product.productName);
    event.preventDefault();
    if (
      product.productName !== (undefined && null) &&
      product.categoryId !== (undefined && null) &&
      product.quantityPerUnit !== (undefined && null) &&
      product.unitPrice !== (undefined && null) &&
      product.unitsInStock !== (undefined && null)
    ) {
      alertify.confirm(
        "Update Product",
        "Are you sure the update this product?",
        function () {
          alertify.success("Successfully Updated");
          saveProduct(product).then(() => {
            history.push("/");
          });
        },
        function () {
          alertify.error("Update Cancelled");
        }
      );
    } else {
      alertify.alert("Error!", "Required fields empty");
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: product.productName ? null : "Product name required",
        categoryId: product.categoryId ? null : "Category required",
        unitPrice: product.unitPrice ? null : "Unit price required",
        quantityPerUnit: product.quantityPerUnit
          ? null
          : "Quantity Per Unit required",
        unitsInStock: product.unitsInStock ? null : "Units In Stock required",
      }));
    }
  }

  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

export function getProductById(products, productId) {
  let product = products.find((product) => product.id == productId) || null;
  return product;
}

function mapStateToProps(state, ownProps) {
  const productId = ownProps.match.params.productId;
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};
  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
