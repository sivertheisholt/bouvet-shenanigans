import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { Button } from "./Button"
import { useEffect } from "react"

export interface SpeechRecognitionWrapperProps {
	isRecording: boolean
	setTranscript: (transcript: string) => unknown
	isDoneCb: () => unknown
}

const SpeechRecognitionWrapperComponent = ({
	setTranscript,
	isDoneCb,
}: SpeechRecognitionWrapperProps) => {
	const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
		useSpeechRecognition()

	useEffect(() => {
		setTranscript(transcript)
	}, [transcript])

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>
	}

	const stopRecording = () => {
		SpeechRecognition.stopListening()
		isDoneCb()
	}

	const startListening = () =>
		SpeechRecognition.startListening({ continuous: true, language: "nb-NO" })
	const stopListening = () => SpeechRecognition.stopListening()

	return (
		<div>
			<h1 style={{ textAlign: "center" }} className=" pt-2 fs-2">
				Hold for å aktivere
			</h1>
			<img
				onMouseDown={startListening}
				onMouseUp={stopListening}
				onTouchStart={startListening}
				onTouchEnd={stopListening}
				className="pt-4"
				style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
				width="30%"
				src={
					listening ? "./images/microphone-open.png" : "./images/microphone-closed.png"
				}
			/>
			<h1
				style={{ textAlign: "center" }}
				className=" mt-4 fs-2 text-decoration-underline"
			>
				Resultat
			</h1>
			<p>{transcript}</p>

			<div className="pt-4">
				<Button className="fs-5" onClick={stopRecording} title="Ferdig" />
				<Button className="fs-5" onClick={resetTranscript} title="Start på nytt" />
			</div>
		</div>
	)
}

export const SpeechRecognitionWrapper = SpeechRecognitionWrapperComponent
