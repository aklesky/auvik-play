export interface IGroupTopics {
  urlkey: string;
  topic_name: string;
}

export interface IGroup {
  group_topics: IGroupTopics[];
  group_city: string;
  group_country: string;
  group_id: number;
  group_name: string;
  group_lon: number;
  group_urlname: string;
  group_lat: number;
}
