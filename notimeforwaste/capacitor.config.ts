import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'notimeforwaste',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    "cordova-plugin-file": {}
  }
};

export default config;
