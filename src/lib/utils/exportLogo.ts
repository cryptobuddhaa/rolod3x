export function exportAsSvg(svg: SVGSVGElement): void {
  const source = `
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="500" fill="#0088cc"/>
      <circle cx="250" cy="250" r="100" fill="none" stroke="#ffffff" stroke-width="40"/>
      <path
        d="M250,50 A200,200 0 0,1 450,250"
        fill="none"
        stroke="#ffffff"
        stroke-width="40"
        stroke-linecap="round"
      />
      <path
        d="M250,450 A200,200 0 0,1 50,250"
        fill="none"
        stroke="#ffffff"
        stroke-width="40"
        stroke-linecap="round"
      />
      <circle cx="450" cy="250" r="20" fill="#ffffff"/>
      <circle cx="50" cy="250" r="20" fill="#ffffff"/>
    </svg>`;

  const blob = new Blob([source], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'rolodex-logo.svg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportAsPng(svg: SVGSVGElement, size: number = 512): void {
  const source = `
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="500" fill="#0088cc"/>
      <circle cx="250" cy="250" r="100" fill="none" stroke="#ffffff" stroke-width="40"/>
      <path
        d="M250,50 A200,200 0 0,1 450,250"
        fill="none"
        stroke="#ffffff"
        stroke-width="40"
        stroke-linecap="round"
      />
      <path
        d="M250,450 A200,200 0 0,1 50,250"
        fill="none"
        stroke="#ffffff"
        stroke-width="40"
        stroke-linecap="round"
      />
      <circle cx="450" cy="250" r="20" fill="#ffffff"/>
      <circle cx="50" cy="250" r="20" fill="#ffffff"/>
    </svg>`;

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  img.onload = () => {
    if (ctx) {
      ctx.fillStyle = '#0088cc';
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'rolodex-logo.png';
      link.href = pngUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  img.src = 'data:image/svg+xml;base64,' + btoa(source);
}