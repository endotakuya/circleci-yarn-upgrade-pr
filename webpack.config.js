module.exports = {
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions:['.ts', '.js'],
    alias: {
      'is-plain-object$': 'is-plain-object/index.cjs.js'
    }
  }
}
