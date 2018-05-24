/* global requestAnimationFrame, cancelAnimationFrame */
import './styles.css'

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

const bigBagOfStateWithTheBois = {
  width: null,
  height: null,
  left: null,
  top: null,
  frameRequest: null,
  maxTilt: 2
}

const onMouseMove = (event) => {
  if (bigBagOfStateWithTheBois.frameRequest !== null) {
    cancelAnimationFrame(bigBagOfStateWithTheBois.frameRequest)
  }

  bigBagOfStateWithTheBois.event = event
  bigBagOfStateWithTheBois.frameRequest = requestAnimationFrame(update)
}

const onMouseLeave = (event) => {
  requestAnimationFrame(reset)
}

const reset = () => {
  rippemDipTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
}

const getTilt = () => {
  const x = (bigBagOfStateWithTheBois.event.clientX - bigBagOfStateWithTheBois.left) / bigBagOfStateWithTheBois.width
  const y = (bigBagOfStateWithTheBois.event.clientY - bigBagOfStateWithTheBois.top) / bigBagOfStateWithTheBois.height
  const boundedX = Math.min(Math.max(x, 0), 1)
  const boundedY = Math.min(Math.max(y, 0), 1)
  const tiltX = (bigBagOfStateWithTheBois.maxTilt / 2 - boundedX * bigBagOfStateWithTheBois.maxTilt).toFixed(3)
  const tiltY = (boundedY * bigBagOfStateWithTheBois.maxTilt - bigBagOfStateWithTheBois.maxTilt / 2).toFixed(3)

  return {
    x: tiltX,
    y: tiltY
  }
}

const updateElementPosition = () => {
  const rect = rippemDipTarget.getBoundingClientRect()

  bigBagOfStateWithTheBois.width = rippemDipTarget.offsetWidth
  bigBagOfStateWithTheBois.height = rippemDipTarget.offsetHeight
  bigBagOfStateWithTheBois.left = rect.left
  bigBagOfStateWithTheBois.top = rect.top
}

const update = () => {
  const tilt = getTilt()
  rippemDipTarget.style.transform = `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
  bigBagOfStateWithTheBois.frameRequest = null
}

const rippemDipTarget = document.getElementById('fg')

const flippemRippemDip = () => {
  document.body.addEventListener('mouseenter', updateElementPosition)
  document.body.addEventListener('mousemove', onMouseMove)
  document.body.addEventListener('mouseleave', onMouseLeave)
}

const mobileBunwop = () => {
  // const container = document.getElementById('hej')
  const fg = document.getElementById('fg')

  const handleOrientationEvent = (frontToBack, leftToRight, rotateDegrees) => {
    // const r = Math.floor(Math.abs(((frontToBack + 180) / 360) * 255))
    // const g = Math.floor(Math.abs(((leftToRight + 90) / 180) * 255))
    // const b = Math.floor(Math.abs((rotateDegrees / 360) * 255))

    // const highHueBits = Math.floor(Math.abs(((frontToBack + 180) / 360) * 127))
    // const lowHueBits = Math.floor(Math.abs(((leftToRight + 90) / 180) * 127))

    // const foo = `rgb(${r}, ${g}, ${b})`
    // const colour = `hsl(${highHueBits + lowHueBits}, 100%, 50%)`
    // container.style.color = colour
    fg.style.filter = `hue-rotate(${frontToBack}deg)`
  }

  const throttle = (func, interval) => {
    let lastCall = 0
    return function () {
      let now = Date.now()
      if (lastCall + interval < now) {
        lastCall = now
        return func.apply(bigBagOfStateWithTheBois, arguments)
      }
    }
  }

  const throttledOrientationEventHandler = throttle(handleOrientationEvent, 10)

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function (event) {
      // alpha: rotation around z-axis
      // -180 -> 180
      const rotateDegrees = event.alpha
      // gamma: left to right
      // -90 -> 90
      const leftToRight = event.gamma
      // beta: front back motion
      // 0 -> 360
      const frontToBack = event.beta

      throttledOrientationEventHandler(frontToBack, leftToRight, rotateDegrees)
    }, true)
  }
}

const scooperDooper = () => {
  const qualities = ['q-low', 'q-medium', 'q-high', 'q-ultra']
  const rotate = () => {
    const fg = document.getElementById('fg')
    const bg = document.getElementById('bg')

    const currentQuality = Array.from(fg.classList).find((className) => className.startsWith('q-'))

    const currentQualityIndex = qualities.indexOf(currentQuality)
    const nextQualityIndex = (currentQualityIndex + 1) % qualities.length

    const nextQuality = qualities[nextQualityIndex]
    fg.classList.remove(currentQuality)
    fg.classList.add(nextQuality)
    bg.classList.remove(currentQuality)
    bg.classList.add(nextQuality)
  }
  document.body.addEventListener('click', rotate)
}

if (isMobile) {
  mobileBunwop()
} else {
  document.getElementById('fg').style.willChange = 'transform'
  flippemRippemDip()
}

scooperDooper()
