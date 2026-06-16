export interface Template {
  id: string
  name: string
  description: string
  icon: string
  html: string
  css: string
  javascript: string
}

export const TEMPLATES: Template[] = [
  {
    id: 'default',
    name: '默认示例',
    description: '基础的 Hello World 示例',
    icon: '✨',
    html: `<div class="container">
  <h1>Hello, Sandbox!</h1>
  <p>Start editing to see live changes.</p>
  <button id="btn">Click Me</button>
</div>`,
    css: `.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: system-ui, sans-serif;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  color: #fff;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #f7df1e, #e44d26);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  color: #a0a0c0;
  margin-bottom: 1.5rem;
}

button {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background: #e44d26;
  color: white;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(228, 77, 38, 0.4);
}`,
    javascript: `const btn = document.getElementById('btn');
let count = 0;

btn.addEventListener('click', () => {
  count++;
  console.log('Button clicked!', { count, timestamp: Date.now() });

  const obj = {
    name: 'Sandbox',
    version: '1.0',
    features: ['live preview', 'console', 'sharing'],
    nested: { deep: { value: 42 } }
  };
  console.info('Object output demo:', obj);
});

console.log('Sandbox ready! Edit the code above.');`,
  },
  {
    id: 'button-interaction',
    name: '按钮交互',
    description: '各种按钮交互效果演示',
    icon: '🔘',
    html: `<div class="container">
  <h1>Button Interactions</h1>
  <div class="buttons">
    <button class="btn primary">Primary</button>
    <button class="btn success">Success</button>
    <button class="btn danger">Danger</button>
    <button class="btn ghost">Ghost</button>
    <button class="btn 3d">3D Effect</button>
    <button class="btn glitch">Glitch</button>
    <button class="btn shine">Shine</button>
  </div>
  <div id="log"></div>
</div>`,
    css: `.container {
  min-height: 100vh;
  padding: 3rem;
  background: #1a1a2e;
  font-family: system-ui, sans-serif;
}

h1 {
  color: #fff;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 600;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.btn {
  padding: 1rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  position: relative;
  overflow: hidden;
}

.primary { background: #667eea; color: white; }
.primary:hover { transform: scale(1.05); box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4); }

.success { background: #48bb78; color: white; }
.success:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(72, 187, 120, 0.4); }

.danger { background: #f56565; color: white; }
.danger:hover { transform: rotate(3deg) scale(1.05); }

.ghost { background: transparent; color: #fff; border: 2px solid #fff; }
.ghost:hover { background: #fff; color: #1a1a2e; }

.3d {
  background: #ed8936;
  color: white;
  box-shadow: 0 6px 0 #c05621;
}
.3d:hover { transform: translateY(2px); box-shadow: 0 4px 0 #c05621; }
.3d:active { transform: translateY(6px); box-shadow: 0 0 0 #c05621; }

.glitch {
  background: #e53e3e;
  color: white;
  animation: glitch 2s infinite;
}
@keyframes glitch {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 1px); }
  40% { transform: translate(2px, -1px); }
  60% { transform: translate(-1px, 2px); }
  80% { transform: translate(1px, -2px); }
}

.shine {
  background: linear-gradient(90deg, #667eea, #764ba2);
  color: white;
}
.shine::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s;
}
.shine:hover::before { left: 100%; }

#log {
  max-width: 800px;
  margin: 2rem auto 0;
  padding: 1rem;
  background: rgba(255,255,255,0.05);
  border-radius: 8px;
  color: #a0aec0;
  font-family: monospace;
  min-height: 2rem;
}`,
    javascript: `const buttons = document.querySelectorAll('.btn');
const log = document.getElementById('log');

buttons.forEach((btn, idx) => {
  btn.addEventListener('click', (e) => {
    const text = e.target.textContent;
    log.textContent = \`[\${new Date().toLocaleTimeString()}] Clicked: \${text}\`;
    console.log('Button clicked:', { index: idx, text, time: Date.now() });
  });
});

console.log('Button demo ready! Try clicking buttons.');`,
  },
  {
    id: 'css-animation',
    name: 'CSS 动画',
    description: '各种 CSS 动画效果演示',
    icon: '🎨',
    html: `<div class="container">
  <h1>CSS Animations</h1>
  <div class="demo-grid">
    <div class="demo">
      <div class="bounce"></div>
      <span>Bounce</span>
    </div>
    <div class="demo">
      <div class="spin"></div>
      <span>Spin</span>
    </div>
    <div class="demo">
      <div class="pulse"></div>
      <span>Pulse</span>
    </div>
    <div class="demo">
      <div class="wave"></div>
      <span>Wave</span>
    </div>
    <div class="demo">
      <div class="gradient"></div>
      <span>Gradient</span>
    </div>
    <div class="demo">
      <div class="orbit">
        <div class="planet"></div>
      </div>
      <span>Orbit</span>
    </div>
  </div>
</div>`,
    css: `.container {
  min-height: 100vh;
  padding: 3rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  font-family: system-ui, sans-serif;
}

h1 {
  color: #fff;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 600;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: rgba(255,255,255,0.03);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.05);
}

.demo span {
  color: #a0aec0;
  font-size: 0.9rem;
  font-weight: 500;
}

.bounce {
  width: 50px;
  height: 50px;
  background: #f56565;
  border-radius: 50%;
  animation: bounce 1s ease-in-out infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}

.spin {
  width: 50px;
  height: 50px;
  background: conic-gradient(from 0deg, #f7df1e, #e44d26, #264de4, #f7df1e);
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.pulse {
  width: 50px;
  height: 50px;
  background: #48bb78;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.7; }
}

.wave {
  width: 60px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3px;
}
.wave::before, .wave::after,
.wave span {
  content: '';
  display: block;
  width: 8px;
  height: 100%;
  background: #667eea;
  border-radius: 4px;
  animation: wave 1s ease-in-out infinite;
}
.wave span {
  background: #667eea;
}
.wave::before { animation-delay: -0.3s; }
.wave span { animation-delay: -0.15s; }
.wave::after { animation-delay: 0s; }
@keyframes wave {
  0%, 100% { transform: scaleY(0.3); }
  50% { transform: scaleY(1); }
}

.gradient {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #f093fb, #f5576c, #4facfe, #00f2fe);
  background-size: 400% 400%;
  border-radius: 12px;
  animation: gradient 3s ease infinite;
}
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.orbit {
  width: 60px;
  height: 60px;
  border: 2px solid rgba(255,255,255,0.2);
  border-radius: 50%;
  position: relative;
  animation: spin 3s linear infinite;
}
.planet {
  width: 12px;
  height: 12px;
  background: #f7df1e;
  border-radius: 50%;
  position: absolute;
  top: -6px;
  left: 50%;
  margin-left: -6px;
  box-shadow: 0 0 10px #f7df1e;
}`,
    javascript: `console.log('CSS Animation demo! All animations are pure CSS.');

// Monitor animation frames for demo
let frame = 0;
setInterval(() => {
  frame++;
  if (frame % 60 === 0) {
    console.log(\`Animation running... \${frame / 60}s elapsed\`);
  }
}, 1000 / 60);`,
  },
  {
    id: 'fetch-mock',
    name: '接口请求模拟',
    description: '模拟 API 请求和数据展示',
    icon: '🌐',
    html: `<div class="container">
  <h1>API Mock Demo</h1>
  <div class="controls">
    <button id="fetchBtn">📡 Fetch Users</button>
    <button id="clearBtn">🗑️ Clear</button>
  </div>
  <div id="loading" class="loading hidden">Loading...</div>
  <div id="error" class="error hidden"></div>
  <div id="results" class="results"></div>
</div>`,
    css: `.container {
  min-height: 100vh;
  padding: 3rem;
  background: #0f172a;
  font-family: system-ui, sans-serif;
}

h1 {
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
}

.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

#fetchBtn {
  background: #3b82f6;
  color: white;
}
#fetchBtn:hover { background: #2563eb; transform: translateY(-2px); }

#clearBtn {
  background: transparent;
  color: #94a3b8;
  border: 1px solid #334155;
}
#clearBtn:hover { background: #1e293b; color: #fff; }

.loading {
  text-align: center;
  color: #60a5fa;
  font-weight: 500;
  padding: 2rem;
  animation: pulse 1s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.error {
  max-width: 600px;
  margin: 0 auto 2rem;
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  color: #f87171;
  text-align: center;
}

.results {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
}

.user-card {
  background: #1e293b;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #334155;
  transition: all 0.2s;
}
.user-card:hover {
  border-color: #3b82f6;
  transform: translateX(4px);
}

.user-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
}

.user-info h3 {
  color: #f1f5f9;
  margin: 0;
  font-size: 1.1rem;
}
.user-info p {
  color: #64748b;
  margin: 0;
  font-size: 0.9rem;
}

.user-stats {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #334155;
}
.stat {
  color: #94a3b8;
  font-size: 0.85rem;
}
.stat strong {
  color: #60a5fa;
  font-size: 1.1rem;
  display: block;
}

.hidden { display: none; }`,
    javascript: `// Mock API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock fetch function
async function mockFetchUsers() {
  console.log('🚀 Initiating API request...');
  
  // Simulate network delay
  await delay(1200);
  
  // Simulate random error (10% chance)
  if (Math.random() < 0.1) {
    console.error('❌ Network error: Request failed');
    throw new Error('Network error: Failed to fetch users');
  }
  
  const mockUsers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', posts: 42, followers: 1234, following: 567 },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', posts: 28, followers: 892, following: 234 },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', posts: 156, followers: 5678, following: 123 },
    { id: 4, name: 'David Brown', email: 'david@example.com', posts: 73, followers: 2345, following: 890 },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', posts: 91, followers: 3456, following: 456 },
  ];
  
  console.log('✅ Response received:', { status: 200, dataLength: mockUsers.length });
  console.log('📦 User data:', mockUsers);
  
  return mockUsers;
}

const fetchBtn = document.getElementById('fetchBtn');
const clearBtn = document.getElementById('clearBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const results = document.getElementById('results');

fetchBtn.addEventListener('click', async () => {
  loading.classList.remove('hidden');
  error.classList.add('hidden');
  results.innerHTML = '';
  
  try {
    const users = await mockFetchUsers();
    
    loading.classList.add('hidden');
    
    users.forEach(user => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML = \`
        <div class="user-header">
          <div class="avatar">\${user.name[0]}</div>
          <div class="user-info">
            <h3>\${user.name}</h3>
            <p>\${user.email}</p>
          </div>
        </div>
        <div class="user-stats">
          <div class="stat"><strong>\${user.posts}</strong>Posts</div>
          <div class="stat"><strong>\${user.followers}</strong>Followers</div>
          <div class="stat"><strong>\${user.following}</strong>Following</div>
        </div>
      \`;
      results.appendChild(card);
    });
    
    console.info('🎉 Users rendered successfully!');
  } catch (err) {
    loading.classList.add('hidden');
    error.classList.remove('hidden');
    error.textContent = err.message;
  }
});

clearBtn.addEventListener('click', () => {
  results.innerHTML = '';
  error.classList.add('hidden');
  console.log('🧹 Results cleared');
});

console.log('API Mock demo ready. Click "Fetch Users" to see it in action!');
console.log('💡 Tip: Open console to see detailed request logs');`,
  },
  {
    id: 'canvas-demo',
    name: 'Canvas 动画',
    description: 'Canvas 绘制的粒子动画效果',
    icon: '🎨',
    html: `<div class="container">
  <h1>Canvas Particles</h1>
  <div class="controls">
    <label>
      Particle Count:
      <input type="range" id="countSlider" min="10" max="200" value="80">
      <span id="countValue">80</span>
    </label>
    <label>
      Speed:
      <input type="range" id="speedSlider" min="0.5" max="3" step="0.1" value="1">
      <span id="speedValue">1.0</span>
    </label>
    <button id="resetBtn">🔄 Reset</button>
  </div>
  <canvas id="canvas"></canvas>
  <div class="stats">
    <span>FPS: <strong id="fps">0</strong></span>
    <span>Particles: <strong id="particleCount">0</strong></span>
  </div>
</div>`,
    css: `.container {
  min-height: 100vh;
  padding: 2rem;
  background: #0a0a0f;
  font-family: system-ui, sans-serif;
}

h1 {
  color: #fff;
  text-align: center;
  margin: 0 0 1.5rem;
  font-weight: 600;
  letter-spacing: 2px;
}

.controls {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  color: #a0aec0;
  font-size: 0.9rem;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.controls input[type="range"] {
  width: 120px;
  accent-color: #f7df1e;
}

.controls span {
  color: #f7df1e;
  font-weight: 600;
  min-width: 30px;
  display: inline-block;
}

#resetBtn {
  padding: 0.5rem 1rem;
  background: #f7df1e;
  color: #0a0a0f;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}
#resetBtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(247, 223, 30, 0.3);
}

#canvas {
  display: block;
  margin: 0 auto;
  background: radial-gradient(circle at center, #1a1a2e 0%, #0a0a0f 100%);
  border-radius: 12px;
  border: 1px solid #2a2d4e;
  cursor: crosshair;
}

.stats {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 1rem;
  color: #636da0;
  font-size: 0.85rem;
  font-family: monospace;
}
.stats strong {
  color: #f7df1e;
}`,
    javascript: `const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const countSlider = document.getElementById('countSlider');
const speedSlider = document.getElementById('speedSlider');
const countValue = document.getElementById('countValue');
const speedValue = document.getElementById('speedValue');
const resetBtn = document.getElementById('resetBtn');
const fpsDisplay = document.getElementById('fps');
const particleCountDisplay = document.getElementById('particleCount');

canvas.width = Math.min(800, window.innerWidth - 48);
canvas.height = 500;

let particles = [];
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;
let speed = 1;

const colors = ['#f7df1e', '#e44d26', '#264de4', '#98c379', '#61afef', '#c678dd'];

class Particle {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.radius = Math.random() * 3 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.life = 1;
  }
  
  update() {
    // Mouse attraction
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 150) {
      const force = (150 - dist) / 150;
      this.vx += (dx / dist) * force * 0.1 * speed;
      this.vy += (dy / dist) * force * 0.1 * speed;
    }
    
    // Velocity damping
    this.vx *= 0.99;
    this.vy *= 0.99;
    
    // Update position
    this.x += this.vx * speed;
    this.y += this.vy * speed;
    
    // Wrap around edges
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    
    // Glow effect
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius * 2
    );
    gradient.addColorStop(0, this.color + '40');
    gradient.addColorStop(1, this.color + '00');
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = \`rgba(255, 255, 255, \${(1 - dist / 100) * 0.15})\`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function initParticles(count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
  particleCountDisplay.textContent = count;
}

// FPS counter
let lastTime = performance.now();
let frameCount = 0;
let fps = 0;

function animate(currentTime) {
  frameCount++;
  if (currentTime - lastTime >= 1000) {
    fps = frameCount;
    fpsDisplay.textContent = fps;
    frameCount = 0;
    lastTime = currentTime;
  }
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  
  drawConnections();
  
  requestAnimationFrame(animate);
}

// Event listeners
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

countSlider.addEventListener('input', (e) => {
  const count = parseInt(e.target.value);
  countValue.textContent = count;
  initParticles(count);
  console.log('Particle count updated:', count);
});

speedSlider.addEventListener('input', (e) => {
  speed = parseFloat(e.target.value);
  speedValue.textContent = speed.toFixed(1);
});

resetBtn.addEventListener('click', () => {
  initParticles(parseInt(countSlider.value));
  console.log('Particles reset');
});

window.addEventListener('resize', () => {
  canvas.width = Math.min(800, window.innerWidth - 48);
});

// Start
initParticles(parseInt(countSlider.value));
requestAnimationFrame(animate);
console.log('🎨 Canvas particle demo ready!');
console.log('Move your mouse over the canvas to attract particles.');`,
  },
  {
    id: 'threejs-demo',
    name: 'Three.js 3D',
    description: 'Three.js 3D 场景演示（使用 CDN）',
    icon: '🎮',
    html: `<div class="container">
  <h1>Three.js 3D Scene</h1>
  <div id="canvas-container"></div>
  <div class="controls">
    <button id="addCube">+ Add Cube</button>
    <button id="toggleSpin">⏸️ Pause Spin</button>
    <button id="changeColor">🎨 Change Color</button>
  </div>
  <div id="loading">Loading Three.js from CDN...</div>
</div>`,
    css: `.container {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #0c0c1e 0%, #1a1a3e 100%);
  font-family: system-ui, sans-serif;
}

h1 {
  color: #fff;
  text-align: center;
  margin: 0 0 1rem;
  font-weight: 600;
}

#canvas-container {
  width: 100%;
  max-width: 900px;
  height: 500px;
  margin: 0 auto 1.5rem;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #2a2d4e;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

#canvas-container canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}

.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.controls button {
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.controls button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

#addCube:hover { background: #48bb78; border-color: #48bb78; }
#toggleSpin:hover { background: #ed8936; border-color: #ed8936; }
#changeColor:hover { background: #667eea; border-color: #667eea; }

#loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #a0aec0;
  font-size: 1.1rem;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
}
#loading.hidden { display: none; }`,
    javascript: `// Dynamically load Three.js from CDN
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function init() {
  try {
    console.log('📦 Loading Three.js from CDN...');
    await loadScript('https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.min.js');
    console.log('✅ Three.js loaded, version:', THREE.REVISION);
    
    document.getElementById('loading').classList.add('hidden');
    
    const container = document.getElementById('canvas-container');
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);
    scene.fog = new THREE.Fog(0x0a0a1a, 10, 50);
    
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 8);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0xff00ff, 1, 100);
    pointLight1.position.set(5, 5, 5);
    pointLight1.castShadow = true;
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight2.position.set(-5, 3, -5);
    scene.add(pointLight2);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Ground plane
    const planeGeometry = new THREE.PlaneGeometry(50, 50);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      metalness: 0.8,
      roughness: 0.4,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2;
    plane.receiveShadow = true;
    scene.add(plane);
    
    // Grid helper
    const gridHelper = new THREE.GridHelper(50, 50, 0x333366, 0x222244);
    gridHelper.position.y = -1.99;
    scene.add(gridHelper);
    
    // Cubes array
    const cubes = [];
    const colors = [0xff6b6b, 0x4ecdc4, 0xffe66d, 0x95e1d3, 0xf38181, 0xaa96da, 0xfcbad3];
    
    function createCube(x = 0, y = 0, z = 0) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        metalness: 0.3,
        roughness: 0.3,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, z);
      cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      cube.castShadow = true;
      cube.receiveShadow = true;
      cube.userData = {
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        bobOffset: Math.random() * Math.PI * 2,
      };
      scene.add(cube);
      cubes.push(cube);
      console.log('🧊 Cube added, total:', cubes.length);
      return cube;
    }
    
    // Create initial cubes
    for (let i = 0; i < 5; i++) {
      createCube(
        (Math.random() - 0.5) * 6,
        Math.random() * 2,
        (Math.random() - 0.5) * 4
      );
    }
    
    // Controls
    let isSpinning = true;
    let colorIndex = 0;
    const bgColors = [0x0a0a1a, 0x1a0a1a, 0x0a1a1a, 0x1a1a0a];
    
    document.getElementById('addCube').addEventListener('click', () => {
      createCube(
        (Math.random() - 0.5) * 6,
        Math.random() * 3 + 1,
        (Math.random() - 0.5) * 4
      );
    });
    
    document.getElementById('toggleSpin').addEventListener('click', (e) => {
      isSpinning = !isSpinning;
      e.target.textContent = isSpinning ? '⏸️ Pause Spin' : '▶️ Resume Spin';
      console.log('Spin:', isSpinning ? 'ON' : 'OFF');
    });
    
    document.getElementById('changeColor').addEventListener('click', () => {
      colorIndex = (colorIndex + 1) % bgColors.length;
      scene.background = new THREE.Color(bgColors[colorIndex]);
      scene.fog.color = new THREE.Color(bgColors[colorIndex]);
      console.log('🎨 Background changed to:', '#' + bgColors[colorIndex].toString(16));
    });
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
    });
    
    // Animation
    let time = 0;
    function animate() {
      requestAnimationFrame(animate);
      time += 0.016;
      
      if (isSpinning) {
        cubes.forEach((cube, i) => {
          cube.rotation.x += cube.userData.rotSpeed.x;
          cube.rotation.y += cube.userData.rotSpeed.y;
          cube.rotation.z += cube.userData.rotSpeed.z;
          cube.position.y += Math.sin(time * 2 + cube.userData.bobOffset) * 0.005;
        });
        
        pointLight1.position.x = Math.sin(time) * 8;
        pointLight1.position.z = Math.cos(time) * 8;
        pointLight2.position.x = Math.cos(time * 0.7) * 6;
        pointLight2.position.z = Math.sin(time * 0.7) * 6;
      }
      
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 2 + 2 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    }
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    console.log('🎮 Three.js scene ready!');
    console.log('💡 Move your mouse to rotate camera, use buttons to interact');
    
  } catch (error) {
    console.error('❌ Failed to load Three.js:', error);
    document.getElementById('loading').textContent = 'Failed to load Three.js. Check console.';
  }
}

init();`,
  },
]

export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id)
}
