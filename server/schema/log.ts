import { gql } from 'apollo-server-koa';
export const LogTopic = gql`
  type Log {
    time: String
    message: String
  }
`;
