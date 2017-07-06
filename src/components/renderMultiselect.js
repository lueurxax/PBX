/**
 * Created by xax on 24.06.2017.
 */
import React from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/lib/less/react-widgets.less';
const renderMultiselect = ({ input, data, valueField, textField, defaultValue }) =>
  <Multiselect {...input}
               onBlur={() => input.onBlur()}
               value={input.value || defaultValue } // requires value to be an array
               data={data}
               valueField={valueField}
               textField={textField}
  />;
export default renderMultiselect;
