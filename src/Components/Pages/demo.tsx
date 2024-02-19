import React, { useEffect, useRef, useState } from 'react'

const CandlestickChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [currentPrice, setCurrentPrice] = useState<number | null>(null)
  const [historicalCandles, setHistoricalCandles] = useState<any[]>([])

  useEffect(() => {
    // Define historical candlestick data
    const historicalData = [
      { open: 100, high: 120, low: 90, close: 110 },
      { open: 110, high: 130, low: 95, close: 105 },
      { open: 105, high: 115, low: 90, close: 100 },
      // Add more historical candlestick data here
    ]

    setHistoricalCandles(historicalData)

    // Update live candlestick data every second
    const interval = setInterval(generateLiveCandle, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Save completed live candle as historical data after 1 minute
    if (currentPrice !== null) {
      const timeout = setTimeout(() => {
        // Generate new candle based on the last minute's data
        const lastMinuteData = {
          open: historicalCandles[historicalCandles.length - 1].open,
          high: Math.max(
            ...historicalCandles.map((candle) => candle.high),
            currentPrice
          ),
          low: Math.min(
            ...historicalCandles.map((candle) => candle.low),
            currentPrice
          ),
          close: currentPrice,
        }
        setHistoricalCandles((prevCandles) => [...prevCandles, lastMinuteData])
        setCurrentPrice(null) // Reset current price after completing the candle
      }, 60000) // 1 minute

      return () => clearTimeout(timeout)
    }
  }, [currentPrice, historicalCandles])

  const generateLiveCandle = () => {
    // Generate random live candlestick data
    const newPrice = Math.random() * 100 + 100
    setCurrentPrice(newPrice)
  }

  const drawHistoricalCandles = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#171B26' // Set background color
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Draw horizontal lines
    ctx.lineWidth = 0.1 // Adjust the line weight as needed

    // Draw horizontal lines
    ctx.strokeStyle = '#d3d3d3' // Set grey color for lines
    for (let y = 0; y < ctx.canvas.height; y += 50) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(ctx.canvas.width, y)
      ctx.stroke()
    }

    // Draw vertical lines
    for (let x = 0; x < ctx.canvas.width; x += 80) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, ctx.canvas.height)
      ctx.stroke()
    }

    historicalCandles.forEach((candle, index) => {
      const x = index * 50 // Adjust as needed for candle spacing
      drawCandle(ctx, candle, x)
    })
  }

  const drawLiveCandle = (ctx: CanvasRenderingContext2D) => {
    if (currentPrice !== null) {
      const x = historicalCandles.length * 50 // Adjust as needed for candle spacing
      const liveCandle = {
        open: currentPrice,
        high: currentPrice,
        low: currentPrice,
        close: currentPrice,
      }
      drawCandle(ctx, liveCandle, x)
    }
  }

  const drawCandle = (
    ctx: CanvasRenderingContext2D,
    candle: any,
    x: number
  ) => {
    const candleWidth = 10
    const yScale = 2
    const yOffset = 50

    // Draw previous or current candlestick
    const { open, high, low, close } = candle
    const yOpen = ctx.canvas.height - open * yScale - yOffset
    const yClose = ctx.canvas.height - close * yScale - yOffset
    const yHigh = ctx.canvas.height - high * yScale - yOffset
    const yLow = ctx.canvas.height - low * yScale - yOffset

    ctx.strokeStyle = open > close ? '#F23645' : '#089981'
    ctx.beginPath()
    ctx.moveTo(x, yHigh)
    ctx.lineTo(x, yLow)
    ctx.stroke()

    ctx.fillRect(x - candleWidth / 2, yOpen, candleWidth, yClose - yOpen)

    // Draw candlestick body
    ctx.strokeStyle = open > close ? '#F23645' : '#089981'
    ctx.fillStyle = open > close ? '#F23645' : '#089981'
    ctx.beginPath()
    ctx.moveTo(x, yClose)
    ctx.lineTo(x, yOpen)
    ctx.stroke()
    ctx.fillRect(x - candleWidth / 2, yOpen, candleWidth, yClose - yOpen)

    // Show open, high, and low data in top-right corner
    ctx.fillStyle = 'white'
    ctx.font = '15px Arial'
    ctx.fillText(`Open: ${open.toFixed(2)}`, ctx.canvas.width - 200, 20)
    ctx.fillText(`High: ${high.toFixed(2)}`, ctx.canvas.width - 200, 40)
    ctx.fillText(`Low: ${low.toFixed(2)}`, ctx.canvas.width - 200, 60)
  }

  useEffect(() => {
    // Drawing logic for historical and live candles
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawHistoricalCandles(ctx)
        drawLiveCandle(ctx)
      }
    }
  }, [historicalCandles, currentPrice])

  return <canvas ref={canvasRef} width={900} height={600} />
}

export default CandlestickChart
