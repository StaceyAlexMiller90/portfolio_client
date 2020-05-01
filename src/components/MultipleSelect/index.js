import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const MultipleSelect = (props) => {
  const options = props.options
  const label = props.label
  const classes = useStyles()

  const [filter, setFilter] = useState([])

  const handleChange = (event) => {
    setFilter(event.target.value)
    props.updateFilter(label, event.target.value)
  }

  const renderValue = (selected) => (
    <div className={classes.chips}>
      {selected.map((value) => (
        <Chip
          className={classes.chip}
          key={value}
          label={value}
          style={{
            fontFamily: 'regularJohn',
            textTransform: 'uppercase',
            margin: '2px',
          }}
        />
      ))}
    </div>
  )

  return (
    <FormControl className={classes.formControl}>
      <InputLabel
        style={{ fontFamily: 'regularJohn', textTransform: 'uppercase' }}
        id="demo-mutiple-chip-label"
      >
        {label}
      </InputLabel>
      <Select
        style={{
          fontFamily: 'bigJohn',
        }}
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        value={filter}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={renderValue}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            style={{
              fontFamily: 'regularJohn',
              textTransform: 'uppercase',
              fontSize: '.8rem',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default MultipleSelect
