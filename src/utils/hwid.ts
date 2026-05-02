/**
 * Geração de HWID consistente para o navegador
 * Tenta replicar o comportamento da DLL x86 usando fingerprinting do navegador
 */

/**
 * Gera SHA-256 de uma string
 */
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Coleta informações do navegador/sistema para criar um fingerprint único
 */
async function getBrowserFingerprint(): Promise<string> {
  const components: string[] = [];

  // User Agent
  components.push(navigator.userAgent);

  // Idioma
  components.push(navigator.language);

  // Timezone
  components.push(Intl.DateTimeFormat().resolvedOptions().timeZone);

  // Resolução da tela
  components.push(`${screen.width}x${screen.height}x${screen.colorDepth}`);

  // Hardware concurrency (número de CPUs)
  components.push(String(navigator.hardwareConcurrency || 0));

  // Device memory (se disponível)
  if ('deviceMemory' in navigator) {
    components.push(String((navigator as any).deviceMemory));
  }

  // Platform
  components.push(navigator.platform);

  // Canvas fingerprint (mais estável)
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = 200;
      canvas.height = 50;
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('XerecaAuth', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('XerecaAuth', 4, 17);
      components.push(canvas.toDataURL());
    }
  } catch (e) {
    // Canvas pode falhar em alguns navegadores
  }

  // WebGL fingerprint
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        components.push((gl as any).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL));
        components.push((gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
      }
    }
  } catch (e) {
    // WebGL pode não estar disponível
  }

  return components.join('|');
}

/**
 * Gera HWID consistente baseado no navegador/sistema
 * Armazena no localStorage para manter consistência
 */
export async function getHWID(): Promise<string> {
  const STORAGE_KEY = 'xereca_hwid';
  
  // Tentar recuperar HWID armazenado
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return stored;
  }

  // Gerar novo HWID baseado no fingerprint
  const fingerprint = await getBrowserFingerprint();
  const hwid = await sha256(fingerprint);

  // Armazenar para uso futuro
  localStorage.setItem(STORAGE_KEY, hwid);

  return hwid;
}

/**
 * Reseta o HWID (útil para testes ou quando o usuário troca de máquina)
 */
export function resetHWID(): void {
  localStorage.removeItem('xereca_hwid');
}

/**
 * Verifica se já existe um HWID armazenado
 */
export function hasStoredHWID(): boolean {
  return localStorage.getItem('xereca_hwid') !== null;
}
