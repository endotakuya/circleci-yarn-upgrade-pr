module.exports = {
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: [
          {
            loader: 'tslint-loader',
            options: {
              typeCheck: true,
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions:['.ts', '.js']
  }
}
