/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    // fontFamily: {
    //   sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
    // },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      fontSize:{
        text_15: '15px'
      },
      colors: {
        sidebar: '#6f6f6f',
        dark: '#161823',
        light: '#ffffff',
        active: '#3D5EE1',
        footer: '#808191',
        button: '#6c757d'
      },
      borderColor: {
        primary: '#3D5EE1',
        secondary: '#e3e3e3',
        'hover-primary': '#18aefa',
        button: '#d7d9de'
      },
      backgroundColor: {
        light: '#ffffff',
        content: '#F7F7FA',
        primary: '#3D5EE1',
        'hover-primary': '#18aefa',
        'hover-secondary': '#f7f7f7',
        button: '#f5f5f5'
      },
      height: {
        header: '3.75rem', // Header height - 60px
        sidebar: 'calc(100vh - 3.75rem)' // Sidebar height
      },
      spacing: {
        header: '3.75rem', // Header height
        sidebar: '16.25rem', // Sidebar width
        'mini-sidebar': '5rem' // Mini sidebar width
      },
      width: {
        sidebar: '16.25rem', // Sidebar width - 260px
        'mini-sidebar': '5rem' // Mini sidebar width - 80px
      }
    }
  },
  plugins: []
}
