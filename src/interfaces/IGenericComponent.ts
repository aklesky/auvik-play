import { IResponsive } from './IResponsive';
import { ITheme } from './ITheme';

export interface IGeneric extends IResponsive {
  theme: ITheme;
  background?: string;
  color?: string;
}
