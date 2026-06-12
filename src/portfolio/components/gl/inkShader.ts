/**
 * Hand-rolled WebGL ink renderer — zero dependencies.
 *
 * Renders a domain-warped fBm "ink in water" field tinted with the portfolio
 * palette. One fullscreen triangle, one fragment shader, ~6KB of code.
 * The React wrapper (InkCanvas) owns scheduling; this module owns GL state.
 */

export interface InkParams {
  /** Animation speed multiplier (1 = default drift) */
  speed: number
  /** Noise frequency multiplier (higher = more turbulent detail) */
  turbulence: number
  /** Overall ink density 0..1 */
  inkAmount: number
  /** Crimson vein intensity 0..1 */
  accentAmount: number
  /** Paper (background) color, linear 0..1 RGB */
  paper: [number, number, number]
  /** Ink (foreground cloud) color */
  ink: [number, number, number]
  /** Accent (crimson) color */
  accent: [number, number, number]
}

export interface InkRenderer {
  /** Draw one frame at absolute time `t` (seconds) with pointer in uv space */
  render(t: number, pointer: [number, number], pointerGlow: number): void
  /** Resize the drawing buffer (CSS pixels × dpr) */
  resize(width: number, height: number): void
  setParams(p: InkParams): void
  destroy(): void
}

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform vec2  u_pointer;
uniform float u_pointerGlow;
uniform vec3  u_paper;
uniform vec3  u_ink;
uniform vec3  u_accent;
uniform float u_speed;
uniform float u_turbulence;
uniform float u_inkAmount;
uniform float u_accentAmount;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.05 + vec2(3.7, 1.1);
    a *= 0.5;
  }
  return v;
}

void main() {
  float aspect = u_resolution.x / u_resolution.y;
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = u_time * 0.06 * u_speed;

  // Pointer swirl — bend the sampling space around the cursor
  vec2 ptr = vec2(u_pointer.x * aspect, u_pointer.y);
  vec2 toPtr = p - ptr;
  float d = length(toPtr);
  float influence = exp(-d * 4.0) * u_pointerGlow;
  float ang = influence * 2.4;
  mat2 swirl = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
  p = ptr + swirl * toPtr;

  // Domain-warped fBm — the ink body
  float freq = 1.6 * u_turbulence;
  vec2 q = vec2(
    fbm(p * freq + vec2(0.0, t * 0.9)),
    fbm(p * freq + vec2(5.2, 1.3) - t * 0.7)
  );
  vec2 r = vec2(
    fbm(p * freq + 3.2 * q + vec2(1.7, 9.2) + t * 1.1),
    fbm(p * freq + 3.2 * q + vec2(8.3, 2.8) - t * 0.8)
  );
  float f = fbm(p * freq + 3.0 * r);

  // Ink density — clouds biased toward the frame edges so copy stays readable
  float edge = smoothstep(0.18, 0.62, distance(uv, vec2(0.42, 0.55)));
  float ink = smoothstep(0.28, 0.92, f) * u_inkAmount * mix(0.35, 1.0, edge);
  vec3 col = mix(u_paper, u_ink, ink);

  // Crimson veins along the warp ridges + pointer ember
  float vein = smoothstep(0.62, 0.98, r.x * r.y * 2.2) * u_accentAmount;
  vein += influence * 0.55;
  col = mix(col, u_accent, clamp(vein, 0.0, 1.0) * 0.5);

  // Film vignette + grain
  float vig = smoothstep(1.25, 0.45, distance(uv, vec2(0.5)));
  col = mix(col * 0.94, col, vig);
  col += (hash(gl_FragCoord.xy + fract(u_time) * 61.7) - 0.5) * 0.028;

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // eslint-disable-next-line no-console -- shader bugs are invisible without this
    if (import.meta.env.DEV) console.error('[ink] shader error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

/** Parse a #rrggbb hex color into linear-ish 0..1 RGB */
export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

export function createInkRenderer(canvas: HTMLCanvasElement): InkRenderer | null {
  const gl =
    canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    }) ?? null
  if (!gl) return null

  const vs = compile(gl, gl.VERTEX_SHADER, VERT)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null

  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    // eslint-disable-next-line no-console -- shader bugs are invisible without this
    if (import.meta.env.DEV) console.error('[ink] link error:', gl.getProgramInfoLog(program))
    return null
  }
  gl.useProgram(program)

  // Fullscreen triangle
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const aPos = gl.getAttribLocation(program, 'a_pos')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  const u = (name: string) => gl.getUniformLocation(program, name)
  const loc = {
    resolution: u('u_resolution'),
    time: u('u_time'),
    pointer: u('u_pointer'),
    pointerGlow: u('u_pointerGlow'),
    paper: u('u_paper'),
    ink: u('u_ink'),
    accent: u('u_accent'),
    speed: u('u_speed'),
    turbulence: u('u_turbulence'),
    inkAmount: u('u_inkAmount'),
    accentAmount: u('u_accentAmount'),
  }

  let params: InkParams = {
    speed: 1,
    turbulence: 1,
    inkAmount: 0.8,
    accentAmount: 0.6,
    paper: [0.98, 0.98, 0.97],
    ink: [0.06, 0.06, 0.06],
    accent: [0.82, 0.2, 0.15],
  }

  return {
    setParams(p) {
      params = p
    },
    resize(width, height) {
      canvas.width = Math.max(1, Math.round(width))
      canvas.height = Math.max(1, Math.round(height))
      gl.viewport(0, 0, canvas.width, canvas.height)
    },
    render(t, pointer, pointerGlow) {
      gl.uniform2f(loc.resolution, canvas.width, canvas.height)
      gl.uniform1f(loc.time, t)
      gl.uniform2f(loc.pointer, pointer[0], pointer[1])
      gl.uniform1f(loc.pointerGlow, pointerGlow)
      gl.uniform3f(loc.paper, ...params.paper)
      gl.uniform3f(loc.ink, ...params.ink)
      gl.uniform3f(loc.accent, ...params.accent)
      gl.uniform1f(loc.speed, params.speed)
      gl.uniform1f(loc.turbulence, params.turbulence)
      gl.uniform1f(loc.inkAmount, params.inkAmount)
      gl.uniform1f(loc.accentAmount, params.accentAmount)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
    destroy() {
      gl.deleteBuffer(buf)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    },
  }
}
