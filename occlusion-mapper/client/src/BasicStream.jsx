import React, { useEffect, useState } from 'react'
import { BasicPlayer } from 'media-stream-player'

// Force a login by fetching usergroup
const authorize = async () => {
  try {
    await window.fetch('/axis-cgi/usergroup.cgi', {
      credentials: 'include',
      mode: 'no-cors',
    })
  } catch (err) {
    console.error(err)
  }
}

/**
 * Example application that uses the `BasicPlayer` component.
 */

export const BasicStream = () => {
  const [authorized, setAuthorized] = useState(false)
  const camera_ip = window.camera_ip
  const camera_username = process.env['REACT_APP_CAMERA_USERNAME']
  const camera_password = process.env['REACT_APP_CAMERA_PASSWORD']
  console.log(`process.env: ${JSON.stringify(process.env)}`)
  console.log(`camera_ip: ${window.camera_ip}`)
  useEffect(() => {
    authorize()
      .then(() => {
        setAuthorized(true)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  if (!authorized) {
    return <div>authenticating...</div>
  }

  return (
    <BasicPlayer
      hostname={camera_ip}
      format="RTP_H264"
      autoPlay
      autoRetry
      vapixParams={{ resolution: '1280x720' }}
    />
  )
}
