declare module 'swagger-ui-express' {
    const swaggerUi: {
      serve: any;
      setup: (swaggerDoc: any, options?: any) => any;
    };
    export default swaggerUi;
  }