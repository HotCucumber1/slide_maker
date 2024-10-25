import styles from "./SelectField.module.css";


type SelectFieldItem = {
    icon: string,
    name: string,
};


type SelectFieldProps = {
    items: SelectFieldItem[],
};

function SelectField({items}: SelectFieldProps)
{
    const selectFieldItems = items.map(item => (
        <li key={item.name}>
            <div>
                <img
                    src={item.icon}
                    alt={item.name}
                    className={styles.selectFieldIcon}
                />
                <span className={styles.selectFieldName}>
                    {item.name}
                </span>
            </div>
        </li>
    ));

    return (
        <ul className={styles.selectField}>
            {selectFieldItems}
        </ul>
    )
}

export {
    SelectField
}