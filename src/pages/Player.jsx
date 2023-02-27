import { useRef } from "react"

const Player = (props) => {

    const { src, muted, autoPlay } = props

    const videoRef = useRef(null)

    return (
        <>
            <div className="player-container">
                <video ref={videoRef} src={src} type="video/mp4" controls></video>
            </div>
        </>
    )
}

export default Player