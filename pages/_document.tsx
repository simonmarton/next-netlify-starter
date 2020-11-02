import { Children } from 'react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

export default class Document extends NextDocument {
  render = () => (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initalProps = await NextDocument.getInitialProps(ctx);

  return {
    ...initalProps,
    styles: [...Children.toArray(initalProps.styles), sheets.getStyleElement()],
  };
};
