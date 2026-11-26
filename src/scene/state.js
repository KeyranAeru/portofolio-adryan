export const sceneState = { page: 'beranda', burst: 0 }
// Memicu embusan angin pada rumput & awan (0..1)
export const burst = (p) => { sceneState.burst = Math.max(sceneState.burst, p) }
