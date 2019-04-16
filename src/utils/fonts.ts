import WebFont from 'webfontloader';

export default () => {
  WebFont.load({
    google: {
      families: ['Roboto:400']
    },
    active: () => {
      sessionStorage.fonts = true;
    }
  });
};
