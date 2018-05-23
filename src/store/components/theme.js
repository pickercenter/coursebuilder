const IMAGE_SERVER = "https://s3.us-east-2.amazonaws.com/sipa-canvas/canvas-images/"

export default {
  state: {
    theme: { option: "Columbia", banner: 'CU01', slim: 'CU01_Slim', wide:'STV1_BannerBlue', logo: IMAGE_SERVER + "SipaLogo2.png" },
    themeOptions:[
      // { option: "Default", banner: '', slim: '', logo: IMAGE_SERVER + "SipaLogo2.png" },
      { option: "Columbia", banner: 'CU01', slim: 'CU01_Slim', wide:'STV1_BannerBlue', logo: IMAGE_SERVER + "CU_Default_Logo.png" },
      { option: "SIPA", banner: 'SIPA', wide: 'WIDE', slim: 'SIPA_Slim', logo: IMAGE_SERVER + "SipaLogo2.png" },
      { option: "Social Work", banner: 'SSW', slim: 'SSW_Slim', logo: IMAGE_SERVER + "SSW_logo.png" },
      { option: "Mailman", banner: 'MM', slim: 'MM_Slim', logo: IMAGE_SERVER + "MM_logo2.png" },
    ]
  },
  getters: {
    getTheme: state => state.theme,
    getThemeOptions: state => state.themeOptions,
    getGraphics: state => state,
  },
  mutations: {
    updateTheme: (state, payload) => {
      state.theme = payload
    }
  }
}
