import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    // Returns an object like: { html, head, errorHtml, chunks, styles }
    return renderPage();
  }

  render () {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="stylesheet" href="https://lanistacoach.s3.amazonaws.com/static/css/mfb.css"/>
          <link rel="stylesheet" href="https://lanistacoach.s3.amazonaws.com/static/css/glogal-style.css"/>
          <link rel="stylesheet" href="https://lanistacoach.s3.amazonaws.com/static/css/style.css"/>
        </Head>
        <body>
          <Main style="height: 100%;" />
          <NextScript style="height: 100%;"/>
        </body>
      </html>
    )
  }
}
