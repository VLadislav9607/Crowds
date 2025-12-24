module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    "@babel/plugin-transform-export-namespace-from",
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@constants": "./src/constants",
          "@helpers": "./src/helpers",
          "@hooks": "./src/hooks",
          "@navigation": "./src/navigation",
          "@services": "./src/services",
          "@styles": "./src/styles",
          "@types": "./src/types",
          "@ui": "./src/ui",
          "@store": "./src/store",
          "@modules/common": "./src/modules/common",
          "@modules/profile": "./src/modules/profile",
          "@modules/onboarding": "./src/modules/onboarding",
          "@modules/events": "./src/modules/events",
          "@modules/kyc": "./src/modules/kyc",
          "@actions": "./src/actions",
          "@services":"./src/services"
        }
      }
    ],
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env.local",
        safe: false,
        allowUndefined: true,
        verbose: false
      }
    ],
    'react-native-worklets/plugin',
  ]
};
