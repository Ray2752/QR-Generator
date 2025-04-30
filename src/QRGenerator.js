import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

function QRGenerator() {
  const [url, setUrl] = useState('');
  const [size, setSize] = useState(128);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#000000');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(parseInt(e.target.value, 10));
  };

  const handleBgColorChange = (e) => {
    setBgColor(e.target.value);
  };

  const handleFgColorChange = (e) => {
    setFgColor(e.target.value);
  };

  const downloadQR = () => {
    const svg = document.getElementById("qr-code");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode.png";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="qr-generator">
      <h1>GENERADOR DE CÓDIGOS QR</h1>
      
      <div className="input-group">
        <label htmlFor="url-input">Introduce una URL:</label>
        <input
          id="url-input"
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://ejemplo.com"
        />
      </div>
      
      <div className="input-group">
        <label htmlFor="size-input">Tamaño del QR: {size}px</label>
        <input
          id="size-input"
          type="range"
          min="64"
          max="512"
          value={size}
          onChange={handleSizeChange}
        />
      </div>
      
      <div className="color-controls">
        <div className="input-group">
          <label htmlFor="bg-color">Color de fondo:</label>
          <input
            id="bg-color"
            type="color"
            value={bgColor}
            onChange={handleBgColorChange}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="fg-color">Color del código:</label>
          <input
            id="fg-color"
            type="color"
            value={fgColor}
            onChange={handleFgColorChange}
          />
        </div>
      </div>
      
      {url && (
        <div className="qr-code-container">
          <QRCodeSVG
            id="qr-code"
            value={url}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            level="Q" 
          />
          <div></div>
          <button onClick={downloadQR} className="download-btn">
            Descargar QR
          </button>
        </div>
      )}
    </div>
  );
}

export default QRGenerator;