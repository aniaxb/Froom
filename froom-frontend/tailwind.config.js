  /** @type {(tailwindConfig: object) => object} */
  import withMT from '@material-tailwind/react/utils/withMT';

  module.exports = withMT({
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          tearose: '#F7CBCA',
          timberwolf: '#eaddd7',
          lightbeige: '#DDD3D3',
          antiwhite: '#F1F7F7',
          lightblue: '#BDD7D8',
          raisinblack: '#2D2D34',
          darkcyan: '#5B979A'
        }
      },
    },
    plugins: [],
  });
