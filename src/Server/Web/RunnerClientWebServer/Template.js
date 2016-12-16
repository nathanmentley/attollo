export default ({ body, title }) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" href="/app.css" />
      </head>
      <body>
        <div id="app-container">${body}</div>
        <script src="/app.js"></script>
      </body>
    </html>
  `;
};