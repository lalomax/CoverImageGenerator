const SliderInput = (props: any) => {
    return (
        <div className={props.className}>
            <label className="text-slate-400">{props.label}</label>
            <input
                type="range"
                min={props.min}
                max={props.max}
                step={props.step}
                value={props.value}
                onChange={props.onChange}
            />
            <input
                type="number"
                min={props.min}
                max={props.max}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

export default SliderInput