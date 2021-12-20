import * as React from 'react';
import { TextInput } from 'react-native';

export default function DTMergeInput(props) {
    const [text, setText] = React.useState('');
    const [length, setLength] = React.useState('');
    const [minutes, setInMinutes] = React.useState(false);
    var mode = props.mode;
    var style = props.style;
    const updateFields = value => {
        setText(value);
        setLength(value.length);
        props.getValue(value);
    }

    const caseCheck = (e, length) => {
        var s = e.split("");
        var st = "0" + e;
        switch (length) {
            case 0:
                updateFields(st);
                break;
            case 1:
                updateFields(st);
                break;
            case 3:
                if (e.includes("0") && s[0] == "0") {
                    s.splice(0, 1);
                    let t = s.join("");
                    let st = t + "/";
                    updateFields(st);
                } else {
                    s.splice(2, 0, "/");
                    let t = s.join("");
                    updateFields(t);
                }
                break;
            case 4:
                s.splice(s.indexOf("/") + 1, 0, "0");
                st = s.join("");
                console.log(st);
                updateFields(st);
                break;
            case 5:
                st = e + "/";
                updateFields(st);
                break;
            case 6:
                if (s[3] == 0) {
                    s.splice(s.indexOf("/") + 1, 1);
                    let t = s.join("");
                    st = t + "/"
                    updateFields(st);
                } else {
                    s.splice(s.indexOf("/") + 3, 0, "/");
                    let t = s.join("");
                    st = t;
                    updateFields(st);
                }
                break;
            case 10:
                if (mode == "date") {
                    st = e;
                } else {
                    st = e + " ";
                }
                updateFields(st);
                break;
            case 11:
                if (s[9] != " ") {
                    s.splice(10, 0, " ");
                    let t = s.join("");
                    st = t;
                    updateFields(st);
                }
                break;
            case 12:
                s.splice(s.indexOf(" ") + 1, 0, "0");
                var t = s.join("");
                st = t;
                updateFields(st);
                setInMinutes(false);
                break;
            case 13:
                st = e + ":";
                updateFields(st);
                break;
            case 14:
                if (!minutes) {
                    s.splice(s.indexOf(" ") + 1, 1);
                    let st = s.join("") + ":";
                    let t = st;
                    updateFields(t);
                    setInMinutes(true);
                } else {
                    s.splice(s.indexOf(" ") + 3, 0, ":");
                    let t = s.join("");
                    updateFields(t);
                }
                break;
            default:
                updateFields(e);
                break;
        }
    }

    return (
            <TextInput
                maxLength={mode == "date" ? 10 : 16}
                placeholder={mode == "date" ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm'}
                value={value != "" && value!=null ? value : text}
                onChangeText={(e) => {
                    e = e.replace(/[A-Za-z&\#,+()$~%.'"*?<>{}@!^]/g, "");
                    if (e.length > length) {
                        caseCheck(e, e.length);
                    } else {
                        updateFields(e);
                    }
                }}

                onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                    }
                }}
                
                style={style} keyboardType={'decimal-pad'} />
    );
}

DTMergeInput.defaultProps = {
    mode: "date-time"
};
