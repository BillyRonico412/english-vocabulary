import { DifficultType, getEmoteDifficult } from "../utils"

interface Props {
	difficult: DifficultType
}

const CountWord = (props: Props) => {
	return (
		<div className="bg-primary-tint flex flex-col items-center py-4 rounded">
			<p className="text-lg font-bold flex gap-x-2">
				<span>{getEmoteDifficult(props.difficult)}</span>
				<span>
					{props.difficult[0].toUpperCase() + props.difficult.slice(1)}
				</span>
			</p>
			<p className="font-medium">0</p>
		</div>
	)
}

export default CountWord
