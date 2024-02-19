import React, { useEffect, useRef, useState } from 'react'
const CandlestickChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [currentPrice, setCurrentPrice] = useState<number | null>(null)
  const [currentCandle, setCurrentCandle] = useState<any | null>(null)
  const [previousCandle, setPreviousCandle] = useState<any | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = generateCurrentPrice()
      setCurrentPrice(newPrice)
    }, 1000) // Update every second

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (currentPrice !== null) {
      if (currentCandle === null) {
        const candle = {
          open: currentPrice,
          high: currentPrice,
          low: currentPrice,
          close: currentPrice,
        }
        setCurrentCandle(candle)
      } else {
        const newCandle = { ...currentCandle }
        if (newCandle.high < currentPrice) {
          newCandle.high = currentPrice
        }
        if (newCandle.low > currentPrice) {
          newCandle.low = currentPrice
        }
        newCandle.close = currentPrice
        setCurrentCandle(newCandle)
      }
    }
  }, [currentPrice])

  useEffect(() => {
    if (currentCandle !== null) {
      const timeout = setTimeout(() => {
        setPreviousCandle(currentCandle)
        localStorage.setItem('previousCandle', JSON.stringify(currentCandle))
        setCurrentCandle(null)
        setCurrentPrice(null)
      }, 60000) // Store after 1 minute

      return () => clearTimeout(timeout)
    }
  }, [currentCandle])

  useEffect(() => {
    const storedCandle = localStorage.getItem('previousCandle')
    if (storedCandle) {
      const candle = JSON.parse(storedCandle)
      setPreviousCandle(candle)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (previousCandle) {
      drawChart(ctx, previousCandle, 'previous')
    }
    if (currentCandle) {
      drawChart(ctx, currentCandle, 'current')
    }
  }, [currentCandle, previousCandle])

  const generateCurrentPrice = () => {
    // Generate a random price between 100 and 200
    return Math.random() * 100 + 100
  }

  const drawChart = (
    ctx: CanvasRenderingContext2D,
    candle: any,
    type: 'previous' | 'current'
  ) => {
    const candleWidth = 10
    const x = type === 'previous' ? 50 : 150
    const yScale = 2
    const yOffset = 50

    // Highlight background based on current price compared to open price
    const fillColor = candle.open < candle.close ? '#e6ffe6' : '#ffe6e6'
    ctx.fillStyle = fillColor
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Draw horizontal dotted line for current price
    ctx.setLineDash([5, 5])
    ctx.strokeStyle = 'gray'
    ctx.beginPath()
    ctx.moveTo(0, ctx.canvas.height - currentPrice! * yScale - yOffset)
    ctx.lineTo(
      ctx.canvas.width,
      ctx.canvas.height - currentPrice! * yScale - yOffset
    )
    ctx.stroke()
    ctx.setLineDash([])

    // Draw previous or current candlestick
    const { open, high, low, close } = candle
    const yOpen = ctx.canvas.height - open * yScale - yOffset
    const yClose = ctx.canvas.height - close * yScale - yOffset
    const yHigh = ctx.canvas.height - high * yScale - yOffset
    const yLow = ctx.canvas.height - low * yScale - yOffset

    ctx.strokeStyle = open > close ? 'red' : 'green'
    ctx.beginPath()
    ctx.moveTo(x, yHigh)
    ctx.lineTo(x, yLow)
    ctx.stroke()

    ctx.fillRect(x - candleWidth / 2, yOpen, candleWidth, yClose - yOpen)

    // Draw candlestick body
    ctx.strokeStyle = open > close ? 'red' : 'green'
    ctx.fillStyle = open > close ? 'red' : 'green'
    ctx.beginPath()
    ctx.moveTo(x, yClose)
    ctx.lineTo(x, yOpen)
    ctx.stroke()
    ctx.fillRect(x - candleWidth / 2, yOpen, candleWidth, yClose - yOpen)

    // Show current price on the right side of the canvas
    ctx.fillStyle = 'black'
    ctx.font = '12px Arial'
    ctx.fillText(
      currentPrice?.toFixed(2) || '',
      ctx.canvas.width - 40,
      ctx.canvas.height - currentPrice! * yScale - yOffset - 5
    )

    // Show open, high, and low data in top-right corner
    ctx.fillText(`Open: ${candle.open.toFixed(2)}`, ctx.canvas.width - 200, 20)
    ctx.fillText(`High: ${candle.high.toFixed(2)}`, ctx.canvas.width - 200, 40)
    ctx.fillText(`Low: ${candle.low.toFixed(2)}`, ctx.canvas.width - 200, 60)
  }

  return <canvas ref={canvasRef} width={900} height={600} />
}

export default CandlestickChart
