// utils/emailTemplate.js
export const generateEmailTemplate = ( {
    title,
    message,
    buttonText,
    buttonLink,
    variant = "info",
} ) => {
    const variants = {
        success: {
            headerBg: "#4caf50",
            buttonBg: "#4caf50",
        },
        warning: {
            headerBg: "#ff9800",
            buttonBg: "#ff9800",
        },
        error: {
            headerBg: "#f44336",
            buttonBg: "#f44336",
        },
        info: {
            headerBg: "#2196f3",
            buttonBg: "#2196f3",
        },
    }

    const {headerBg, buttonBg} = variants[variant] || variants.info

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${ title }</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #faffd1 0%, #a1ffce 100%);
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 30px auto;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .header {
          background: ${ headerBg };
          color: white;
          text-align: center;
          padding: 20px;
        }
        .content {
          padding: 25px;
          text-align: center;
        }
        h1 {
          font-size: 22px;
          margin-bottom: 10px;
        }
        p {
          font-size: 16px;
          color: #333;
          line-height: 1.5;
        }
        button {
          margin-top: 20px;
          background: ${ buttonBg };
          color: #fff;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 15px;
          font-weight: bold;
        }
        button:hover {
          opacity: 0.9;
        }
        .footer {
          font-size: 12px;
          color: #777;
          text-align: center;
          padding: 15px;
          background: #f7f7f7;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>${ title }</h2>
        </div>
        <div class="content">
          <p>${ message }</p>
          ${ buttonText && buttonLink
            ? `<form action="${ buttonLink }" method="GET" target="_blank">
                   <button type="submit">${ buttonText }</button>
                 </form>`
            : ""
        }
        </div>
        <div class="footer">
          <p>&copy; ${ new Date().getFullYear() } Pineapple Farm. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `
};
