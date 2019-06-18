import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    position: '',
  });

  function handleChange(event) {
    props.callback(event.target.value);
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel>Position</InputLabel>
        <Select
          value={values.position}
          onChange={handleChange}
          inputProps={{
            name: 'position',
            id: 'position-id',
          }}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value={'Sales Associate'}>Sales Associate</MenuItem>
          <MenuItem value={'Graphics Designer'}>Graphics Designer</MenuItem>
          <MenuItem value={'Backend Engineer'}>Backend Engineer</MenuItem>
          <MenuItem value={'Frontend Engineer'}>Frontend Engineer</MenuItem>
          <MenuItem value={'Data Science'}>Data Science</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}
