import React, { useEffect } from "react"
import { navigate } from "gatsby"
import useTwilioVideo from "../hooks/use-twilio-video"

const VideoDisplay = ({ roomId }) => {
  const { state, startVideo, leaveRoom, videoRef } = useTwilioVideo()

  useEffect(() => {
    if (!state.token) {
      navigate("/", { state: { roomName: roomId } })
    }

    if (!state.room) {
      startVideo()
    }

    window.addEventListener("beforeunload", leaveRoom)

    return () => {
      window.removeEventListener("beforeunload", leaveRoom)
    }
  }, [state, roomId, startVideo, leaveRoom])

  return (
    <>
      <h1>Room: {roomId}</h1>
      {state.room && (
        <button className="leave-room" onClick={leaveRoom}>
          Leave Room
        </button>
      )}
      <div className="chat" ref={videoRef}></div>
    </>
  )
}

export default VideoDisplay
