const canvas = document.getElementById('thumbCanvas');
const ctx = canvas.getContext('2d');

const titleInput = document.getElementById('titleInput');
const subtitleInput = document.getElementById('subtitleInput');
const themeColor = document.getElementById('themeColor');
const uploadInput = document.getElementById('thumbUpload');
const styleSelect = document.getElementById('styleSelect');

let uploadedImage = null;

function drawBaseGradient(color = '#8b5cf6') {
  const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  g.addColorStop(0, '#090b15');
  g.addColorStop(1, color);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  for (let i = 0; i < 20; i += 1) {
    ctx.fillRect(i * 70, 0, 2, canvas.height);
  }
}

function glowText(text, x, y, size, weight = 900) {
  ctx.font = `${weight} ${size}px Inter, sans-serif`;
  ctx.shadowColor = 'rgba(255,255,255,0.9)';
  ctx.shadowBlur = 20;
  ctx.fillStyle = '#fff';
  ctx.fillText(text, x, y);
  ctx.shadowBlur = 0;
}

function generateThumbnail() {
  const title = titleInput.value.trim() || 'YOUR VIRAL TITLE HERE';
  const subtitle = subtitleInput.value.trim() || 'New episode now live';
  drawBaseGradient(themeColor.value);

  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(70, 420, 1140, 220);

  glowText(title.toUpperCase(), 90, 520, 88);
  ctx.font = '600 44px Inter, sans-serif';
  ctx.fillStyle = '#c7d2fe';
  ctx.fillText(subtitle, 95, 590);
}

function applyRedesign() {
  if (!uploadedImage) {
    alert('Upload an image first.');
    return;
  }

  ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

  const style = styleSelect.value;
  if (style === 'neon') {
    ctx.fillStyle = 'rgba(20,0,60,0.28)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#22d3ee';
  } else if (style === 'mono') {
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#f8fafc';
  } else {
    const overlay = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    overlay.addColorStop(0, 'rgba(244,63,94,.35)');
    overlay.addColorStop(1, 'rgba(99,102,241,.35)');
    ctx.fillStyle = overlay;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fbbf24';
  }

  ctx.lineWidth = 10;
  ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);
}

uploadInput.addEventListener('change', (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      uploadedImage = img;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

document.getElementById('generateBtn').addEventListener('click', generateThumbnail);
document.getElementById('redesignBtn').addEventListener('click', applyRedesign);
document.getElementById('downloadBtn').addEventListener('click', () => {
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = 'thumbnail.png';
  a.click();
});

generateThumbnail();
