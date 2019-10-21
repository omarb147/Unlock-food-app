import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { withRedux } from "../../Redux";
import uniqid from "uniqid";
import "./sidebar.css";

const { Sider } = Layout;

export class Siderbar extends Component {
  onSelectHandler = ({ key }) => {
    const { selectUser } = this.props;
    console.log(key);
    selectUser(key);
  };

  onDeleteHandler = key => {
    if (key != 1) {
      //Delete user
      //select another user
    }
  };

  onAddUserHandler = () => {
    const { users, addFormUser } = this.props;
    if (users.length <= 6) {
      addFormUser(uniqid("user"));
    } else {
      //raise error - too many users
    }
  };

  render() {
    const { userFormData, selectedUser } = this.props;
    console.log(userFormData);
    return (
      <Sider>
        <div className="logo" />
        <Menu mode="inline" theme="dark" selectedKeys={[selectedUser]} defaultSelectedKeys={[selectedUser]}>
          {userFormData &&
            Object.keys(userFormData).map(key => (
              <Menu.Item key={key} onClick={this.onSelectHandler} className="menu_item">
                <div>
                  <Icon type="user" />
                  {userFormData[key].name}
                </div>
                <div>
                  <Icon type="delete" className="delete_icon" onClick={() => this.onClick(key)} />
                </div>
              </Menu.Item>
            ))}
        </Menu>
        <Menu mode="inline" theme="dark" selectable={false}>
          <Menu.Item onClick={this.onAddUserHandler}>
            <Icon type="plus" />
            Add Another User
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default withRedux(Siderbar);
