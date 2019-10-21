import React, { Component } from "react";
import { Form, Input, Icon, InputNumber, Rate, Button, Checkbox } from "antd";
import { compose } from "recompose";
import { withRedux } from "../../Redux";
import withSearch from "./withSearch";

class SearchFormBase extends Component {
  // handleSubmit = e => {
  //   e.preventDefault();

  //   const { form, searchAPI, location, raiseFormCompletionError } = this.props;

  //   form.validateFields((err, values) => {
  //     if (!err && location.data) {
  //       searchAPI({ ...values, location });
  //     } else if (!location.data) {
  //       raiseFormCompletionError();
  //     }
  //   });
  // };

  handleChange = e => {
    const { form, uid, userFormData, editFormForUser } = this.props;
    const currUser = userFormData[uid];

    form.validateFields((err, values) => {
      editFormForUser(uid, values);
    });
  };

  render() {
    const { places, uid, userFormData } = this.props;
    const currUser = userFormData[uid];
    const { getFieldDecorator } = this.props.form;
    console.log(currUser);

    // const keywordError = isFieldTouched("keyword") || getFieldError("keyword") ? true : false;

    return (
      <Form layout="vertical" onChange={this.handleChange}>
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            initialValue: currUser.name
          })(<Input placeholder="Name" />)}
        </Form.Item>
        <Form.Item label="Keyword">{getFieldDecorator("query", {})(<Input placeholder="Enter type of Cusine or meal" />)}</Form.Item>
        <Form.Item label="Distance">
          {getFieldDecorator("radius", { initialValue: 1 })(<InputNumber min={1} max={10} suffix="Miles" step={0.2} />)}
          Miles
        </Form.Item>
        <Form.Item label="Rating">
          {getFieldDecorator("maxPrice", { initialValue: 2.5 })(<Rate character="£" allowClear={true} allowHalf />)}
        </Form.Item>

        {/* <Form.Item style={{ paddingTop: "25px" }}>
          <Button type="primary" htmlType="submit" loading={places.loading}>
            Submit
          </Button>
        </Form.Item> */}
      </Form>
    );
  }
}
const mapPropsToFields = props => {};

const SearchForm = compose(
  withRedux,
  // withSearch,
  Form.create({
    name: "search_form"
    //   mapPropsToFields(props) {
    //     const { uid, userFormData } = props;
    //     const user = userFormData[uid];
    //     console.log("mapPropsToFields", props);
    //     console.log(user.name);
    //     return { name: Form.createFormField({ ...props.username, value: user.name }) };
    //   },
    //   onValuesChange(_, values) {
    //     console.log(values);
    //   }
  })
)(SearchFormBase);

export default SearchForm;
