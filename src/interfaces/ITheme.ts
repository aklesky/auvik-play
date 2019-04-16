export interface ITheme {
  colors: any;
  grid: {
    gutterWidth:  number;
    size: number;
    breakpoints: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
    };
  };
}
