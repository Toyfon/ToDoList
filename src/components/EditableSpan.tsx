import React, {ChangeEvent, useState} from "react";


type EditableSpanPropsType = {
    title: string
    callBack: (title:string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")

    const onEditMode = () => {
        setEditMode(true)
        if (props.title) {
            setTitle(props.title)
        }
    }
    const offEditMode = () => {
        setEditMode(false)
        props.callBack(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        editMode
            ? <input value={title}
                     onBlur={offEditMode}
                     autoFocus={true}
                     onChange={onChangeTitleHandler}/>
            : <span onDoubleClick={onEditMode}>{props.title}
                <button onClick={onEditMode}>edit</button>
        </span>
    )
}