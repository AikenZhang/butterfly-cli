import {
  tab,
  tabs,
  Checkbox,
  CheckboxGroup,
  Button,
  Popup,
  Cell,
  Tabbar,
  TabbarItem,
  Picker,
  DatetimePicker,
  Progress,
  Tag,
  Search,
  Field,
  CellGroup,
  SwipeCell,
  RadioGroup,
  Radio
} from 'vant'
const Vant = {
  vTab:tab,
  vTabs:tabs,
  vCheckbox:Checkbox,
  vCheckboxGroup:CheckboxGroup,
  vButton:Button,
  Popup,
  vCell:Cell,
  vCellGroup:CellGroup,
  Tabbar,
  TabbarItem,
  Picker,
  DatetimePicker,
  vProgress:Progress,
  tag:Tag,
  Search,
  field:Field,
  SwipeCell,
  vRadioGroup:RadioGroup,
  vRadio:Radio
}
const vant = {
  install(Vue) {
    Object.keys(Vant).forEach((key) =>{
      Vue.component(key,Vant[key])
    })
  }
}
export default vant