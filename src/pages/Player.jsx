import { useEffect, useRef, useState } from "react"

import playIcon from '../assets/icons/play.svg'
import pauseIcon from '../assets/icons/pause.svg'
import volumeIcon from '../assets/icons/volume.svg'
import playRoundIcon from '../assets/icons/play_round.svg'
import pauseRoundIcon from '../assets/icons/pause_round.svg'

const Player = (props) => {

    const { src } = props

    const videoRef = useRef(null)
    const volumeControlRef = useRef(null)
    const videoIndicatorRef = useRef(null)
    const controlsContainerRef = useRef(null)
    const volumeRangeRef = useRef(null)
    const volumeSlider = useRef(null)
    const volumeActiveSlider = useRef(null)
    const videoTimelineRef = useRef(null)
    const videoSliderRef = useRef(null)
    const videoActiveSliderRef = useRef(null)
    const videoTimeRef = useRef(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [volumeShown, setVolumeShown] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const twoDigitFormatter = new Intl.NumberFormat(undefined, {
        minimumIntegerDigits: 2
    })

    useEffect(() => {
        volumeRangeRef.current.style.display = `${volumeShown ? 'flex' : 'none'}`
        videoIndicatorRef.current.style.display = `${isHovered ? 'flex' : 'none'}`
        controlsContainerRef.current.style.display = `${isHovered ? 'flex' : 'none'}`
        volumeSlider.current.style.display = `${volumeShown ? 'flex' : 'none'}`
        volumeActiveSlider.current.style.display = `${volumeShown ? 'flex' : 'none'}`

        volumeActiveSlider.current.style.width = '80px'
        videoActiveSliderRef.current.style.width = '0'
        videoTimelineRef.current.max = videoRef.current.duration
    }, [])

    function playPause() {
        if (isPlaying) {
            setIsPlaying(false)
            videoRef.current.pause()
        } else {
            setIsPlaying(true)
            videoRef.current.play()
        }
    }

    function showVolumeControl() {
        setVolumeShown(true)
        volumeRangeRef.current.style.display = 'flex';
        volumeSlider.current.style.display = 'flex';
        volumeActiveSlider.current.style.display = 'flex';
    }

    function hideVolumeControl() {
        setVolumeShown(false)
        volumeRangeRef.current.style.display = 'none';
        volumeSlider.current.style.display = 'none';
        volumeActiveSlider.current.style.display = 'none';
    }

    function showControls() {
        setIsHovered(true)
        videoIndicatorRef.current.style.display = 'flex'
        controlsContainerRef.current.style.display = 'flex'
    }

    function hideControls() {
        setIsHovered(false)
        videoIndicatorRef.current.style.display = 'none'
        controlsContainerRef.current.style.display = 'none'
    }

    function setVolume() {
        videoRef.current.volume = volumeRangeRef.current.value / 10
        volumeActiveSlider.current.style.width = `${volumeRangeRef.current.value === 0 ? 0 : 80 * (volumeRangeRef.current.value / 10)}px`
    }

    function timeUpdate() {
        videoTimelineRef.current.max = videoRef.current.duration
        videoTimelineRef.current.value = videoRef.current.currentTime

        videoActiveSliderRef.current.style.width = `${videoTimelineRef.current.value / videoTimelineRef.current.max * 100}%`

        videoTimeRef.current.innerText = `${formatDuration(videoRef.current.currentTime)} / ${formatDuration(videoRef.current.duration)}`
    }

    function setTimeline() {
        videoRef.current.currentTime = videoTimelineRef.current.value
    }

    function formatDuration(time) {
        const seconds = Math.floor(time % 60)
        const minutes = Math.floor(time / 60) % 60
        const hours = Math.floor(time / 3600)
        
        if (hours === 0) {
            return `${minutes}:${twoDigitFormatter.format(seconds)}`
        } else {
            return `${hours}:${twoDigitFormatter.format(minutes)}::${twoDigitFormatter.format(seconds)}`
        }
    }

    return (
        <div className="player-container" onMouseEnter={showControls} onMouseLeave={hideControls}>
            <img className="video-indicator" onClick={playPause} ref={videoIndicatorRef} src={ isPlaying ? pauseRoundIcon : playRoundIcon } alt=""></img>
            <div className="player-controls-container" ref={controlsContainerRef}>
                <div className="video-timeline-container">
                    <div className="slider" ref={videoSliderRef}></div>
                    <div className="active-slider" ref={videoActiveSliderRef}></div>
                    <input type="range" min="0" step="any" defaultValue={0} onChange={setTimeline} className="video-timeline" ref={videoTimelineRef} />
                </div>
                <div className="player-controls">
                    <div className="pc-left">
                        <img className="play-btn" src={isPlaying ? pauseIcon : playIcon} onClick={playPause} alt=""></img>
                        <div className="volume-control" ref={volumeControlRef} onMouseEnter={showVolumeControl} onMouseLeave={hideVolumeControl}>
                            <img className="volume-btn" src={volumeIcon} alt=""/>
                            <div className="slider" ref={volumeSlider}></div>
                            <div className="active-slider" ref={volumeActiveSlider}></div>
                            <input type="range" min="0" max="10" step="1" className="volume-range" ref={volumeRangeRef} onChange={setVolume} />
                        </div>
                    </div>
                    <div className="pc-right">
                        <p className="f20 video-time" ref={videoTimeRef}>TIME</p>
                    </div>
                </div>
            </div>
            <video ref={videoRef} src={src} onClick={playPause} onTimeUpdate={timeUpdate}></video>
        </div>
    )
}

export default Player