export declare module '@mui/material/styles' {
  interface PaletteOptions {
    neutral?: PaletteColorOptions;
  }
}

export declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
  interface ButtonClasses {
    containedNeutral: true;
  }
}

export declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    outlined: true;
    error: true;
  }
}
