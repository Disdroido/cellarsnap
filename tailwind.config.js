export default {
<<<<<<< HEAD
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
          // Primary Colour
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
          // Accent Colour
          '500': '#21b8a6',
          '600': '#168b80',
          '700': '#166f67',
          '800': '#165953',
          '900': '#174a47',
          '950': '#072c2b',
        },
        'tawny-port': {
          '50': '#fcf3f9',
          '100': '#fbe8f6',
          '200': '#f8d2ed',
          '300': '#f4adde',
          '400': '#ec7ac5',
          '500': '#e252ac',
          '600': '#d0328d',
          '700': '#b42273',
          '800': '#951f5f',
          // Secondary Colour
          '900': '#6f1b48',
          '950': '#4c0b2e',
        },      
        'bunker': {
          '50': '#f7f7f8',
          '100': '#eeeef0',
          '200': '#d9d9de',
          '300': '#b8b9c1',
          '400': '#91939f',
          '500': '#737584',
          '600': '#5d5e6c',
          '700': '#4c4d58',
          '800': '#41414b',
          '900': '#393941',
          // Background Colour
          '950': '#18181b',
        },
        'shark': {
          '50': '#f7f7f8',
          '100': '#eeeef0',
          '200': '#dadadd',
          '300': '#b9bac0',
          '400': '#92939e',
          '500': '#757682',
          '600': '#5f5f6a',
          '700': '#4d4d57',
          '800': '#42424a',
          '900': '#3a3a40',
          // Background Colour
          '950': '#1f1f22',
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
          "secondary": "#174a47",
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
=======
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    styled: true,
    themes: ["acid", "night"],
>>>>>>> template/master
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "night",
  },
<<<<<<< HEAD
};
=======
}
>>>>>>> template/master
