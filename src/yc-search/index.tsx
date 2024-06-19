import InnerForm from './YcForm';
import YcFormItem from './YcFormItem';

type InnerFormType = typeof InnerForm;

type CompoundedComponent = InnerFormType & {
  Item: typeof YcFormItem;
};

const Form = InnerForm as CompoundedComponent;

Form.Item = YcFormItem;

export default Form;
