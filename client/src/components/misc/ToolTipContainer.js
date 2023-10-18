

export default function ToolTip(props) {

    const {message, children, condition} = props

    const visibility = condition ? 'visible' : 'hidden'

    return (
        <div className='tooltip' style={{visibility:visibility}}>
            {children}
            <span className='tooltip-text' style={{visibility:visibility}}>
                {message}
            </span>
        </div>
    )
}