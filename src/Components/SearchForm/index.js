import React, { Component } from "react";
import { Form, Input, Icon, InputNumber, Rate, Button, Checkbox } from "antd";
import { compose } from "recompose";
import { withRedux } from "../../Redux";

class SearchFormBase extends Component {
  render() {
    const { places, selectedUser, userFormData } = this.props;
    const currUser = userFormData[selectedUser];
    const { getFieldDecorator } = this.props.form;
    // const keywordError = isFieldTouched("keyword") || getFieldError("keyword") ? true : false;

    return (
      <Form layout="vertical">
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            initialValue: currUser.name
          })(<Input placeholder="Name" />)}
        </Form.Item>
        <Form.Item label="Keyword">
          {getFieldDecorator("query", { initialValue: currUser.query })(<Input placeholder="Enter type of Cusine or meal" />)}
        </Form.Item>
        <Form.Item label="Distance">
          {getFieldDecorator("radius", { initialValue: currUser.radius })(<InputNumber min={1} max={10} suffix="Miles" step={0.2} />)}
          Miles
        </Form.Item>
        <Form.Item label="Max Price Level">
          {getFieldDecorator("maxPrice", { initialValue: currUser.maxPrice })(<Rate character="£" allowClear={true} allowHalf />)}
        </Form.Item>
      </Form>
    );
  }
}
const handleChange = props => {
  const { form, uid, userFormData, editFormForUser, updateUserFormCompletionStatus } = props;

  form.validateFields((err, values) => {
    editFormForUser(uid, values);
    updateUserFormCompletionStatus(uid);
  });
};

const SearchForm = compose(
  withRedux,
  Form.create({
    name: "search_form",
    onFieldsChange: props => handleChange(props)
  })
)(SearchFormBase);

export default SearchForm;
