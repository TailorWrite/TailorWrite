import clsx from 'clsx'

export interface BasicChipProps {
    className?: string;
    color: Color;
    value: string
}

export type Color = 'blue' | 'yellow' | 'green' | 'red'; 

const BasicChip = ({ className, color, value }: BasicChipProps) => {

    const colorVariants: Record<Color, string> = {
        blue:   'bg-blue-500/20    text-blue-900    dark:bg-blue-600/30    dark:text-blue-400    dark:border-blue-200/20',
        yellow: 'bg-yellow-400/20  text-yellow-900  dark:bg-yellow-600/30  dark:text-yellow-400  dark:border-yellow-200/20',
        green:  'bg-green-500/20   text-green-900   dark:bg-green-600/30   dark:text-green-400   dark:border-green-200/20',
        red:    'bg-red-600/20     text-red-900     dark:bg-red-600/30     dark:text-red-400     dark:border-red-200/20',

    }

    return (
        <div
            className={clsx(
                className,
                colorVariants[color],
                "relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none py-1 px-2 text-xs rounded-md border border-transparent"
            )}
            data-projection-id="156"
            style={{ opacity: 1 }}
        >
            <span className="">
                {value}
            </span>
        </div>
    )
}

export default BasicChip