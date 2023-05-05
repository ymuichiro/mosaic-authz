import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';

interface Item {
  title: string;
  value: string;
}

interface Props {
  name?: string;
  id?: string;
  label?: string;
  items?: Item[];
  required?: boolean;
  value?: string;
  onChange?: (event: SelectChangeEvent) => void;
}

/**
 * mui-material select components
 */
export default function Select(props: Props): JSX.Element {
  return (
    <FormControl required={props.required}>
      <InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
      <MuiSelect
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        labelId={`${props.id}-label`}
        id={props.id}
        label={props.label}
        required={props.required}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {props.items?.map((item, index) => {
          return (
            <MenuItem key={index} value={item.value}>
              {item.title}
            </MenuItem>
          );
        })}
      </MuiSelect>
    </FormControl>
  );
}
