// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    palette: {
      dark: string;
      light: string;
      primary: string;
      secondary: string;
      success: string;
      error: string;
    };
  }
}
