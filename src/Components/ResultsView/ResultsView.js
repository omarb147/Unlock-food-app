import React, { Component } from "react";
import { List, Avatar, Icon } from "antd";
import { withRedux } from "../../Redux";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export class ResultsView extends Component {
  render() {
    const { places } = this.props;
    const { loading, data, error } = places;

    console.log(data);
    const showList = data.length > 0 || loading;
    return (
      <div>
        {showList && (
          <List
            itemLayout="vertical"
            size="large"
            dataSource={data}
            loading={loading}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText type="star" text={`${item.rating}/5`} />,
                  <IconText type="message" text={`${item.user_ratings_total}ratings`} />,
                  <IconText type="pound" text={`${item.price_level}/5`} />,
                  <Icon type="clock-cirle" style={{ color: `${item.opening_hours.open_now ? "green" : "red"}`, marginRight: 8 }}>
                    {item.opening_hours.open_now ? "Open" : "Closed"}
                  </Icon>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.icon} />}
                  title={<a href="#">{item.name}</a>}
                  description={item.formatted_address}
                />
              </List.Item>
            )}
          />
        )}
      </div>
    );
  }
}

export default withRedux(ResultsView);
