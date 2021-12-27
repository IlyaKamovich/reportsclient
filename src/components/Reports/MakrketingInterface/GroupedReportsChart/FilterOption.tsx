import React from 'react';
import { components, GroupBase, OptionProps } from 'react-select';
import { ISelectOption } from './models';

const FilterOption: React.FC<OptionProps<ISelectOption, boolean, GroupBase<ISelectOption>>> = (props) => (
  <components.Option {...props}>
    <input type="checkbox" checked={props.isSelected} onChange={() => null} /> <label>{props.label}</label>
  </components.Option>
);

export default FilterOption;
