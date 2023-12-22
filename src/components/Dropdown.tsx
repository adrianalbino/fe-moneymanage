import {useState} from 'react';
import Styles from "../css/Dropdown.module.css";

function Dropdown({selected, setSelected}) {
    const [isActive, setIsActive] = useState(false)
    const options = ['PHP - Philippine Peso', 'JPY - Japanese Yen']
    return(
        <div className={Styles.dropdown}>
            <div className={Styles.dropdownbtn} onClick={e => setIsActive(!isActive)}>
                {selected}
                <span className="fas fa-caret-down"></span>
            </div>
            {isActive && (
                <div className={Styles.dropdowncontent}>
                    {options.map((option, index) =>(
                    
                        <div key={index} onClick={e => {
                            
                            setSelected(option)
                            setIsActive(false)
                        }}
                        className={Styles.dropdownitem}>{option}</div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;