export const files = {
  fonts: /\.(woff|woff2|(o|t)tf|eot)$/i,
  images: /\.(jpe?g|png|gif|svg)$/i,
  js: /\.(j|t)sx?$/,
  ts: /\.(j|t)sx?$/,
  css: /\.css$/i,
  scss: /\.scss$/i,
  extensions: ['.mjs', '.ts', '.tsx', '.js', '.jsx', '.json'],
  ignore: /\.(?:png|gif|jpg|jpeg|svg|ico|webp|json|js|txt)$/,
  filter: /\.(map|gz|br|txt|license|html)$/i
};
