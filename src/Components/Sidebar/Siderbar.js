import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { withRedux } from "../../Redux";
import uniqid from "uniqid";
import "./sidebar.css";

const { Sider } = Layout;

export class Siderbar extends Component {
  onSelectHandler = ({ key }) => {
    const { selectUser } = this.props;
    selectUser(key);
  };

  onDeleteHandler = (e, key) => {
    e.stopPropagation();
    const { removeFormUser } = this.props;
    if (key != 1) {
      removeFormUser(key);
    }
  };

  onAddUserHandler = () => {
    const { userFormData, addFormUser, updateUserFormCompletionStatus } = this.props;
    if (Object.keys(userFormData).length < 6) {
      const uid = uniqid("user");
      addFormUser(uid);
      updateUserFormCompletionStatus(uid);
    } else {
      //raise error - too many users
    }
  };

  render() {
    const { userFormData, selectedUser } = this.props;
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
                  <Icon type="delete" className="delete_icon" onClick={e => this.onDeleteHandler(e, key)} />
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
