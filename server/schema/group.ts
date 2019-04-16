import { gql } from 'apollo-server-koa';

export const groupTopics = gql`
  type GroupTopics {
    urlkey: String
    topic_name: String
  }
`;

export const group = gql`
  type Group {
    group_topics: [GroupTopics]
    group_city: String
    group_country: String
    group_id: Int
    group_name: String
    group_lon: Int
    group_urlname: String
    group_lat: Int
  }
`;

export default () => [group, groupTopics];
