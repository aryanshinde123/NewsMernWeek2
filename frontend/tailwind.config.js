module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Include all your JSX/JS files
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['Merriweather', 'serif'], // For titles and headlines
        body: ['Roboto', 'sans-serif'], // For body text
      },
      
      colors: {
        nav: "#404044",
        background: "#f8f9fa",
        text: "#212529",

      },
    },
  },
  plugins: [],
};
