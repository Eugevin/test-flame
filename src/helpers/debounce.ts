function debounce(fn: () => void, delay: number = 200) {
  let timer = setTimeout(() => {}, delay)

  return () => {
    clearTimeout(timer)

    timer = setTimeout(() => fn(), delay)
  }
}

export default debounce
