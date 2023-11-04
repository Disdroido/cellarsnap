export default {
  theme: {
    extend: {
      colors: {
        'cardinal': {
          '50': '#fef2f2',
          '100': '#fde7e6',
          '200': '#fad1d1',
          '300': '#f6abab',
          '400': '#f07c7f',
          '500': '#e64d54',
          '600': '#d12d3d',
          '700': '#b82133',
          '800': '#941d2f',
          '900': '#7f1c2f',
          '950': '#460b14',
        },
        'keppel': {
          '50': '#f1fcfa',
          '100': '#cff8ef',
          '200': '#9ff0df',
          '300': '#67e1cd',
          '400': '#38c9b6',
          // base colour
          '500': '#21b8a6',
          '600': '#168b80',
          '700': '#166f67',
          '800': '#165953',
          '900': '#174a47',
          '950': '#072c2b',
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          "primary": "#B82133",
          "secondary": "#21B8A6",
          "accent": "#21B8A6",
          "neutral": "#222222",
          "base-100": "#2D2F2E",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "night",
  },
};
