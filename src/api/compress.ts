// магия by chatGPT для сжатия картинок (чтобы влезли в localstorage, в виде base64)

async function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    await img.decode();
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))), type, quality);
  });
}

export async function compressImageToDataUrl(opts: {
  file: File;
  maxWidth: number;
  maxHeight: number;
  maxBytes: number;
  type?: 'image/jpeg' | 'image/webp';
}): Promise<string> {
  const { file, maxWidth, maxHeight, maxBytes, type = 'image/jpeg' } = opts;

  const img = await loadImageFromFile(file);

  // scale
  const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not available');

  ctx.drawImage(img, 0, 0, w, h);

  // try qualities from high to low until fits
  let quality = 0.9;
  let blob = await canvasToBlob(canvas, type, quality);

  while (blob.size > maxBytes && quality > 0.4) {
    quality -= 0.1;
    // eslint-disable-next-line no-await-in-loop
    blob = await canvasToBlob(canvas, type, quality);
  }

  // if still too big, do one more downscale step
  if (blob.size > maxBytes) {
    canvas.width = Math.max(1, Math.round(w * 0.85));
    canvas.height = Math.max(1, Math.round(h * 0.85));
    const ctx2 = canvas.getContext('2d');
    if (!ctx2) throw new Error('Canvas 2D context not available');
    ctx2.drawImage(img, 0, 0, canvas.width, canvas.height);
    blob = await canvasToBlob(canvas, type, 0.75);
  }

  // Blob -> dataURL
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(new Error('FileReader failed'));
    r.readAsDataURL(blob);
  });

  return dataUrl;
}
