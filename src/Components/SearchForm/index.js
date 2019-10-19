import React, { Component } from "react";
import { Form, Input, Icon, InputNumber, Rate, Button, Checkbox } from "antd";
import { compose } from "recompose";
// import { withRedux } from "../../Redux";
import withSearch from "./withSearch";

const INITIAL_STATE = {
  query: "",
  location: "",
  radius: 100,
  radius_units: "mi",
  minPrice: "0",
  maxPrice: "4",
  openNow: true,
  error: null
};

class SearchFormBase extends Component {
  handleSubmit = e => {
    e.preventDefault();

    const { form, searchAPI, location, raiseFormCompletionError } = this.props;

    form.validateFields((err, values) => {
      if (!err && location.data) {
        searchAPI({ ...values, location });
      } else if (!location.data) {
        raiseFormCompletionError();
      }
    });
  };

  render() {
    const { places } = this.props;
    const {
      getFieldDecorator
      // getFieldsError, isFieldTouched, getFieldError
    } = this.props.form;

    // const keywordError = isFieldTouched("keyword") || getFieldError("keyword") ? true : false;

    return (
      <Form layout="vertical" style={{ display: "flex", justifyContent: "space-between" }} onSubmit={this.handleSubmit}>
        <Form.Item label="Keyword">
          {getFieldDecorator("query", { rules: [{ required: true, message: "Please input search Keyword" }] })(
            <Input placeholder="Enter type of Cusine or meal" />
          )}
        </Form.Item>
        <Form.Item label="Distance">
          {getFieldDecorator("radius", { initialValue: 1 })(
            <InputNumber min={1} max={10} formatter={value => `${value}mi`} parser={value => value.replace("mi", "")} />
          )}
        </Form.Item>
        <Form.Item label="Rating">
          {getFieldDecorator("maxPrice", { initialValue: 2.5 })(<Rate character="£" allowClear={true} allowHalf />)}
        </Form.Item>
        <Form.Item label="Open Now">{getFieldDecorator("openNow", { initialValue: true })(<Checkbox defaultChecked={true} />)}</Form.Item>
        <Form.Item style={{ paddingTop: "25px" }}>
          <Button type="primary" htmlType="submit" loading={places.loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const SearchForm = compose(
  // withRedux,
  withSearch,
  Form.create({ name: "search_form" })
)(SearchFormBase);

export default SearchForm;
