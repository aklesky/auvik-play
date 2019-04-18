export interface ITheme {
  colors?: any;
  grid: {
    gutterWidth?:  number;
    size?: number;
    breakpoints?: {
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
    };
  };
  metrics: {
    padding?: number;
    margin?: number;
    marginVertical?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
    tbody?: number;
  };
}
