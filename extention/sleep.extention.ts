export function sleep(duration: number = 700): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration))
}
