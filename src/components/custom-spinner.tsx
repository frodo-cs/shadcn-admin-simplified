import { Spinner } from "./ui/spinner";

type CustomSpinnerProps = {
    size?: number
}

export function CustomSpinner({ size = 16 }: CustomSpinnerProps) {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <Spinner className={`size-${size}`} />
        </div>
    )
}