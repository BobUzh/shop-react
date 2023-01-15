import './checkbox.scss';

const Checkbox = ({data, change}) => {
    
    return (
        <div className="ckeckbox">
            <input type="checkbox" checked={data.ckecked} onClick={(e) => change(e.target.checked, data.id, data.parent)}/>
            <label htmlFor="">{data.value}</label>
        </div>
    );
}

export default Checkbox;